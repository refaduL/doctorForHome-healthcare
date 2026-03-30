/**
 * pages/DoctorDetail.jsx
 *
 * Full doctor profile page.
 * All formatting and colour helpers imported from shared utils.
 * Layout: hero card → 2-col body (about + schedule | details + CTA).
 * On mobile: single column, CTA sits below schedule.
 */

import { Link, useParams } from "react-router-dom";
import { motion }          from "framer-motion";
import {
  CalendarCheck, Clock, MapPin, Stethoscope,
  GraduationCap, Building2, DollarSign, Mail,
  Phone, CalendarDays, ChevronLeft, UserCircle2,
} from "lucide-react";

import { useDoctors } from "../hooks/useDoctors";

// ── shared utils ──────────────────────────────────────────────────────────────
import {
  fmtFee, fmtDate, fmtTime, calcAge,
  TODAY_NAME, DAYS_ORDER,
} from "../utils/formatters";
import { specColor }    from "../utils/specConfig";
import DoctorAvatar     from "../components/shared/DoctorAvatar";

// ─── page-local sub-components ────────────────────────────────────────────────

/** Animated section card with icon heading */
function Section({ title, Icon, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
    >
      <h2 className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">
        <Icon className="w-4 h-4 text-cyan-500 shrink-0" />
        {title}
      </h2>
      {children}
    </motion.div>
  );
}

/** Key–value info row with icon */
function Field({ Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-slate-100 dark:border-slate-800/80 last:border-0">
      <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 leading-none mb-0.5">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{value}</p>
      </div>
    </div>
  );
}

/** Schedule day grid, sorted by canonical weekday order */
function ScheduleGrid({ schedules = [] }) {
  if (!schedules.length)
    return <p className="text-sm text-slate-400 italic">No schedule available.</p>;

  const sorted = [...schedules].sort(
    (a, b) => DAYS_ORDER.indexOf(a.days) - DAYS_ORDER.indexOf(b.days)
  );

  return (
    <div className="grid sm:grid-cols-2 gap-2">
      {sorted.map((s, i) => {
        const isToday = s.days?.toLowerCase() === TODAY_NAME.toLowerCase();
        return (
          <div
            key={i}
            className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border ${
              isToday
                ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/40"
                : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50"
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              isToday ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"
            }`}>
              <CalendarDays className={`w-4 h-4 ${isToday ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={`text-sm font-bold ${
                  isToday ? "text-emerald-700 dark:text-emerald-300" : "text-slate-700 dark:text-slate-300"
                }`}>
                  {s.days}
                </span>
                {isToday && (
                  <span className="text-[9px] font-bold bg-emerald-500 text-white px-1.5 py-0.5 rounded-full tracking-wide">
                    TODAY
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 shrink-0" />
                {fmtTime(s.sc_time)}
                <span className="text-slate-300 dark:text-slate-600 mx-0.5">·</span>
                {s.slots} slots
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const DoctorDetail = () => {
  const { id } = useParams();
  const { doctors, loading } = useDoctors();
  const doctor = doctors.find((d) => String(d.doctor_id) === String(id));

  // ── Loading state ───────────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
    </div>
  );

  // ── Not-found state ─────────────────────────────────────────────────────────
  if (!doctor) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-slate-50 dark:bg-slate-950 px-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <UserCircle2 className="w-7 h-7 text-slate-400" />
      </div>
      <p className="text-lg font-bold text-slate-900 dark:text-white">Doctor not found</p>
      <p className="text-sm text-slate-400">This profile doesn't exist or was removed.</p>
      <Link
        to="/doctors"
        className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-cyan-500 hover:text-cyan-600"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Doctors
      </Link>
    </div>
  );

  // ── Derived values ──────────────────────────────────────────────────────────
  const c      = specColor(doctor.specialization);
  const branch = doctor.branch?.location_details || doctor.branch || "—";
  const dept   = doctor.dept?.dept_name          || doctor.dept   || "—";
  const age    = calcAge(doctor.dob);

  const todaySched = (doctor.schedules || []).filter(
    (s) => s.days?.toLowerCase() === TODAY_NAME.toLowerCase()
  );
  const avail = todaySched.length > 0;
  const slots = todaySched.reduce((n, s) => n + (s.slots || 0), 0);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.22 }}
        >
          <Link
            to="/doctors"
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition mb-6"
          >
            <ChevronLeft className="w-4 h-4" /> All Doctors
          </Link>
        </motion.div>

        {/* ── HERO CARD ────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden mb-5"
        >
          {/* Specialty accent strip */}
          <div className={`h-2 bg-gradient-to-r ${c.grad} w-full`} />

          <div className="p-5 sm:p-7">
            <div className="flex flex-col sm:flex-row gap-5">

              {/* Avatar — uses DoctorAvatar, "lg" on mobile, "xl" on sm+ */}
              <div className="shrink-0">
                <DoctorAvatar
                  name={doctor.doctor_name}
                  specialty={doctor.specialization}
                  image={doctor.image}
                  size="xl"
                  className="ring-2 ring-slate-100 dark:ring-slate-800"
                />
              </div>

              {/* Name / tags / quals */}
              <div className="flex-1 min-w-0">
                {/* Availability pill */}
                <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border mb-2 ${
                  avail
                    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${avail ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
                  {avail ? `Available Today · ${slots} slots` : "Not Available Today"}
                </span>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                  {doctor.doctor_name}
                </h1>

                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${c.bg} ${c.text}`}>
                    <Stethoscope className="w-3 h-3 shrink-0" />
                    {doctor.specialization}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <Building2 className="w-3 h-3 shrink-0" /> {dept}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <MapPin className="w-3 h-3 shrink-0" /> {branch.replace(" Branch", "")}
                  </span>
                </div>

                {doctor.qualifications && (
                  <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400 flex items-start gap-1.5 leading-relaxed">
                    <GraduationCap className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                    {doctor.qualifications}
                  </p>
                )}
              </div>

              {/* Fee + Book — side panel on sm+, inline row on mobile */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:shrink-0 sm:w-40">
                <div className="text-left sm:text-right">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">Consultation Fee</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                    {fmtFee(doctor.fee)}
                  </p>
                  <p className="text-[11px] text-slate-400">per visit</p>
                </div>
                <Link
                  to="/booking"
                  state={{ doctorId: doctor.doctor_id, doctorName: doctor.doctor_name }}
                  className="shrink-0 sm:w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm hover:opacity-90 transition"
                >
                  <CalendarCheck className="w-4 h-4 shrink-0" /> Book Now
                </Link>
              </div>

            </div>
          </div>
        </motion.div>

        {/* ── BODY ─────────────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-5">

          {/* Left: About + Schedule */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {doctor.about && (
              <Section title="About" Icon={UserCircle2} delay={0.08}>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {doctor.about}
                </p>
              </Section>
            )}

            <Section title="Consultation Schedule" Icon={CalendarDays} delay={0.12}>
              <ScheduleGrid schedules={doctor.schedules} />
            </Section>
          </div>

          {/* Right: Details + CTA */}
          <div className="flex flex-col gap-5">

            <Section title="Details" Icon={Stethoscope} delay={0.1}>
              <Field Icon={MapPin}        label="Branch"     value={branch}                   />
              <Field Icon={Building2}     label="Department" value={dept}                     />
              <Field Icon={DollarSign}    label="Fee"        value={fmtFee(doctor.fee)}       />
              {age && <Field Icon={UserCircle2} label="Age"  value={`${age} years`}           />}
              <Field Icon={CalendarDays}  label="Joined"     value={fmtDate(doctor.joining_date)} />
              <Field Icon={Mail}          label="Email"      value={doctor.email}             />
              <Field Icon={Phone}         label="Mobile"     value={doctor.mobile}            />
            </Section>

            {/* Booking CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.16 }}
              className="relative overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-2xl p-5 text-white"
            >
              <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-white/10" />
              <div className="absolute bottom-1 right-6 w-12 h-12 rounded-full bg-white/10" />

              <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-100 mb-1">
                Ready to consult?
              </p>
              <p className="text-base font-black leading-snug">{doctor.doctor_name}</p>
              <p className="text-sm text-blue-100 mt-1 mb-4">
                {avail ? `${slots} slots open today` : "Book a future appointment"}
              </p>
              <Link
                to="/booking"
                state={{ doctorId: doctor.doctor_id, doctorName: doctor.doctor_name }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition"
              >
                <CalendarCheck className="w-4 h-4 shrink-0" /> Book Appointment
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;