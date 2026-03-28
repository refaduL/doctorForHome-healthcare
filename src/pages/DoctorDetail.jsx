import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  CalendarCheck,
  Clock,
  MapPin,
  Stethoscope,
  GraduationCap,
  Building2,
  DollarSign,
  Mail,
  Phone,
  CalendarDays,
  ChevronLeft,
  CheckCircle2,
  UserCircle2,
  FlaskConical,
} from "lucide-react";

import { useDoctors } from "../hooks/useDoctors";


// HELPERS

const TODAY = new Date().toLocaleDateString("en-US", { weekday: "long" });

const DAYS_ORDER = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const fmtFee = (fee) =>
  fee ? `৳${Number(fee).toLocaleString()}` : "—";

const fmtDate = (s) =>
  s ? new Date(s).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }) : "—";

const fmtTime = (s) => {
  if (!s) return "—";
  const [h, m] = s.split(":");
  const d = new Date(); d.setHours(+h, +m);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
};

const calcAge = (dob) => {
  if (!dob) return null;
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

const initials = (name = "") =>
  name.replace(/^Dr\.?\s*/i, "")
    .split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

const SPECIALTY_COLOR = (specialty = "") => {
  const s = specialty.toLowerCase();
  if (s.includes("cardio"))  return ["from-rose-500/20 to-pink-500/10",    "text-rose-500",   "bg-rose-500/10"  ];
  if (s.includes("neuro"))   return ["from-violet-500/20 to-purple-500/10","text-violet-500", "bg-violet-500/10"];
  if (s.includes("ortho"))   return ["from-amber-500/20 to-yellow-500/10", "text-amber-500",  "bg-amber-500/10" ];
  if (s.includes("derm"))    return ["from-pink-500/20 to-rose-500/10",    "text-pink-500",   "bg-pink-500/10"  ];
  if (s.includes("ophthal")) return ["from-sky-500/20 to-blue-500/10",     "text-sky-500",    "bg-sky-500/10"   ];
  if (s.includes("pediatr")) return ["from-emerald-500/20 to-teal-500/10", "text-emerald-500","bg-emerald-500/10"];
  if (s.includes("onco"))    return ["from-orange-500/20 to-amber-500/10", "text-orange-500", "bg-orange-500/10"];
  return                            ["from-cyan-500/20 to-blue-500/10",    "text-cyan-500",   "bg-cyan-500/10"  ];
};


// SCHEDULE TABLE

function ScheduleTable({ schedules = [] }) {
  if (!schedules.length) return (
    <p className="text-sm text-slate-400 italic">No schedule information available.</p>
  );

  // Sort by day order
  const sorted = [...schedules].sort(
    (a, b) => DAYS_ORDER.indexOf(a.days) - DAYS_ORDER.indexOf(b.days)
  );

  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {sorted.map((s, i) => {
        const isToday = s.days?.toLowerCase() === TODAY.toLowerCase();
        return (
          <div
            key={i}
            className={`flex items-center gap-3 p-3.5 rounded-xl border ${
              isToday
                ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/40"
                : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50"
            }`}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
              isToday ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"
            }`}>
              <CalendarDays className={`w-4 h-4 ${isToday ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={`text-sm font-bold ${isToday ? "text-emerald-700 dark:text-emerald-300" : "text-slate-700 dark:text-slate-300"}`}>
                  {s.days}
                </p>
                {isToday && (
                  <span className="text-[10px] font-bold bg-emerald-500 text-white px-1.5 py-0.5 rounded-full">TODAY</span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3" /> {fmtTime(s.doc_sc.time)}
                <span className="mx-1">·</span>
                <span>{s.doc_sc.slots} slots</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}


// INFO FIELD

function InfoField({ Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-cyan-500" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">{label}</p>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{value}</p>
      </div>
    </div>
  );
}


// MAIN PAGE

const DoctorDetail = () => {
  const { id } = useParams();

  // ── Replace this block with useDoctorById(id) when available ─────────────
  const { doctors, loading } = useDoctors();
  const doctor = doctors.find(
    (d) => String(d.doctor_id) === String(id)
  );
  // ─────────────────────────────────────────────────────────────────────────

  const branch   = doctor?.branch?.location_details || "—";
  const dept     = doctor?.dept?.dept_name          || "—";
  const age      = calcAge(doctor?.dob);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-950 px-6">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <UserCircle2 className="w-8 h-8 text-slate-400" />
        </div>
        <p className="text-xl font-bold text-slate-900 dark:text-white">Doctor not found</p>
        <p className="text-sm text-slate-400">The requested profile doesn't exist or was removed.</p>
        <Link to="/doctors" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-cyan-500 hover:text-cyan-600">
          <ChevronLeft className="w-4 h-4" /> Back to Doctors
        </Link>
      </div>
    );
  }

  const [gradFrom,, specBg] = SPECIALTY_COLOR(doctor.specialization);

  const todaySchedules = (doctor.schedules || []).filter(
    s => s.days?.toLowerCase() === TODAY.toLowerCase()
  );
  const isAvailableToday = todaySchedules.length > 0;
  const totalSlotsToday  = todaySchedules.reduce((sum, s) => sum + (s.doc_sc.slots || 0), 0);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">

        {/* Back link */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
          <Link
            to="/doctors"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition mb-7"
          >
            <ChevronLeft className="w-4 h-4" /> All Doctors
          </Link>
        </motion.div>

        {/* ── HERO CARD ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden mb-6 shadow-sm"
        >
          {/* Gradient header strip */}
          <div className={`h-28 bg-gradient-to-r ${gradFrom} to-transparent relative`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white dark:to-slate-900" />
          </div>

          <div className="px-7 pb-7 -mt-14 relative">
            <div className="flex flex-wrap gap-6 items-end">
              {/* Avatar */}
              <div className="shrink-0">
                {doctor.image ? (
                  <img
                    src={doctor.image}
                    alt={doctor.doctor_name}
                    className="w-28 h-28 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-lg"
                  />
                ) : (
                  <div className={`w-28 h-28 rounded-2xl ${specBg} flex items-center justify-center text-4xl font-black ring-4 ring-white dark:ring-slate-900 shadow-lg`}
                    style={{ color: "var(--spec-color)" }}>
                    <span className={SPECIALTY_COLOR(doctor.specialization)[1]}>
                      {initials(doctor.doctor_name)}
                    </span>
                  </div>
                  // <img
                  //   src="/doctor-img.jpg"
                  //   alt={doctor.doctor_name}
                  //   className="w-28 h-28 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-lg"
                  // />
                )}
              </div>

              {/* Name + meta */}
              <div className="flex-1 min-w-[200px] pb-1">
                {/* Availability pill */}
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                    isAvailableToday
                      ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isAvailableToday ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
                    {isAvailableToday ? `Available Today · ${totalSlotsToday} slots` : "Not Available Today"}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                  {doctor.doctor_name}
                </h1>

                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${specBg} ${SPECIALTY_COLOR(doctor.specialization)[1]}`}>
                    <Stethoscope className="w-3 h-3" />
                    {doctor.specialization}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <Building2 className="w-3 h-3" /> {dept}
                  </span>
                </div>

                {doctor.qualifications && (
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                    <GraduationCap className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                    {doctor.qualifications}
                  </p>
                )}
              </div>

              {/* Fee + CTA — push right on large screens */}
              <div className="w-full sm:w-auto flex flex-col gap-3 sm:items-end mt-2 sm:mt-0">
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl px-4 py-3 text-center sm:text-right">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-0.5">Consultation Fee</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{fmtFee(doctor.fee)}</p>
                  <p className="text-[11px] text-slate-400">per visit</p>
                </div>
                <Link
                  to="/booking"
                  state={{ doctorId: doctor.doctor_id, doctorName: doctor.doctor_name }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm hover:opacity-90 transition shadow-lg shadow-cyan-500/20 w-full sm:w-auto"
                >
                  <CalendarCheck className="w-4 h-4" /> Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── TWO COLUMN BODY ───────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT: About + Schedule */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* About */}
            {doctor.about && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm"
              >
                <h2 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <UserCircle2 className="w-4.5 h-4.5 w-4 h-4 text-cyan-500" /> About
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {doctor.about}
                </p>
              </motion.div>
            )}

            {/* Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-cyan-500" /> Consultation Schedule
              </h2>
              <ScheduleTable schedules={doctor.schedules} />
            </motion.div>
          </div>

          {/* RIGHT: Details + Quick actions */}
          <div className="flex flex-col gap-6">

            {/* Details card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.12 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm"
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                Doctor Details
              </h2>

              <div className="divide-y-0">
                <InfoField Icon={MapPin}       label="Branch"       value={branch}                     />
                <InfoField Icon={Building2}    label="Department"   value={dept}                       />
                <InfoField Icon={DollarSign}   label="Fee"          value={fmtFee(doctor.fee)}         />
                {age && (
                  <InfoField Icon={UserCircle2}  label="Age"          value={`${age} years`}           />
                )}
                <InfoField Icon={CalendarDays} label="Joined"       value={fmtDate(doctor.joining_date)} />
                <InfoField Icon={Mail}         label="Email"        value={doctor.email}               />
                <InfoField Icon={Phone}        label="Mobile"       value={doctor.mobile}              />
              </div>
            </motion.div>

            {/* Quick booking CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.18 }}
              className="relative overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-2xl p-5 text-white shadow-lg"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
              <div className="absolute bottom-0 right-4 w-14 h-14 rounded-full bg-white/10" />
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-100 mb-1.5">Ready to consult?</p>
              <p className="text-lg font-black leading-snug mb-1">{doctor.doctor_name.replace(/^Dr\.?\s*/i, "Dr. ")}</p>
              <p className="text-sm text-blue-100 mb-4">
                {isAvailableToday
                  ? `${totalSlotsToday} slots open today`
                  : "Book a future appointment"}
              </p>
              <Link
                to="/booking"
                state={{ doctorId: doctor.doctor_id, doctorName: doctor.doctor_name }}
                className="block w-full py-2.5 rounded-xl bg-white text-blue-700 font-bold text-sm text-center hover:bg-blue-50 transition"
              >
                <CalendarCheck className="inline w-4 h-4 mr-1.5" />
                Book Appointment
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;