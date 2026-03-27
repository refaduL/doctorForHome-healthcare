/**
 * DoctorDashboard.jsx
 * pages/dashboard/DoctorDashboard.jsx
 */

import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, CalendarDays, Users, CalendarClock, UserCog, LogOut, Sun, Moon, Menu, Stethoscope, Clock, MapPin, Hash, Phone, Mail, CheckCircle2, XCircle, AlertCircle, Timer, ArrowRight, Search, BriefcaseMedical, GraduationCap, Building2, DollarSign, TrendingUp, Activity, Pencil, UserCheck, UserX, ChevronRight, Star, BadgeCheck } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA  (replace with API calls)
// ─────────────────────────────────────────────────────────────────────────────
const DOCTOR = {
  doctor_id: 12,
  doctor_name: "Dr. Arif Hossain",
  gender: "Male",
  dob: "1982-06-14",
  mobile: "01811-223344",
  email: "arif.hossain@dfh.com",
  specialization: "Cardiologist",
  qualifications: "MBBS (DMC), MD (Cardiology), FRCP",
  joining_date: "2020-03-01",
  fee: 1200,
  branch: "Gulshan Branch",
  department: "Cardiology",
  rating: 4.8,
  total_patients: 312,
};

const APPOINTMENTS = [
  { id: 1,  patient: "Nadia Rahman",    age: 28, gender: "Female", date: "2025-04-02", time: "09:00:00", serial: 1, status: "Confirmed", note: "Follow-up — hypertension"     },
  { id: 2,  patient: "Karim Uddin",     age: 45, gender: "Male",   date: "2025-04-02", time: "09:30:00", serial: 2, status: "Confirmed", note: "Chest pain evaluation"         },
  { id: 3,  patient: "Sumaiya Akter",   age: 33, gender: "Female", date: "2025-04-02", time: "10:00:00", serial: 3, status: "Pending",   note: "ECG review"                    },
  { id: 4,  patient: "Rafiq Hasan",     age: 60, gender: "Male",   date: "2025-04-02", time: "10:30:00", serial: 4, status: "Pending",   note: "Post-surgery checkup"          },
  { id: 5,  patient: "Tania Begum",     age: 52, gender: "Female", date: "2025-04-01", time: "11:00:00", serial: 5, status: "Completed", note: "Routine cardiac screening"     },
  { id: 6,  patient: "Jahangir Alam",   age: 38, gender: "Male",   date: "2025-04-01", time: "11:30:00", serial: 6, status: "Completed", note: "Arrhythmia management"         },
  { id: 7,  patient: "Nasrin Khatun",   age: 41, gender: "Female", date: "2025-03-30", time: "09:00:00", serial: 1, status: "Completed", note: "Lipid panel discussion"        },
  { id: 8,  patient: "Mizanur Rahman",  age: 55, gender: "Male",   date: "2025-03-29", time: "14:00:00", serial: 3, status: "Cancelled", note: "Patient no-show"               },
];

const PATIENTS = [
  { id: 101, name: "Nadia Rahman",   age: 28, gender: "Female", mobile: "01712-345678", city: "Dhaka",      visits: 4, last_visit: "2025-04-02", condition: "Hypertension"    },
  { id: 102, name: "Karim Uddin",    age: 45, gender: "Male",   mobile: "01611-998877", city: "Chattogram", visits: 2, last_visit: "2025-04-02", condition: "Angina"          },
  { id: 103, name: "Sumaiya Akter",  age: 33, gender: "Female", mobile: "01911-445566", city: "Dhaka",      visits: 1, last_visit: "2025-04-02", condition: "Arrhythmia"      },
  { id: 104, name: "Rafiq Hasan",    age: 60, gender: "Male",   mobile: "01511-332211", city: "Sylhet",     visits: 6, last_visit: "2025-04-02", condition: "Post-CABG"       },
  { id: 105, name: "Tania Begum",    age: 52, gender: "Female", mobile: "01811-667788", city: "Dhaka",      visits: 3, last_visit: "2025-04-01", condition: "Heart failure"   },
  { id: 106, name: "Jahangir Alam",  age: 38, gender: "Male",   mobile: "01712-001122", city: "Rajshahi",   visits: 2, last_visit: "2025-04-01", condition: "AF (Paroxysmal)" },
  { id: 107, name: "Nasrin Khatun",  age: 41, gender: "Female", mobile: "01611-334455", city: "Dhaka",      visits: 5, last_visit: "2025-03-30", condition: "Dyslipidemia"    },
  { id: 108, name: "Mizanur Rahman", age: 55, gender: "Male",   mobile: "01911-556677", city: "Khulna",     visits: 1, last_visit: "2025-03-29", condition: "CAD workup"      },
];

const SCHEDULE = [
  { day: "Sunday",    active: true,  slots: 12, time: "09:00 – 13:00" },
  { day: "Monday",    active: true,  slots: 10, time: "09:00 – 12:00" },
  { day: "Tuesday",   active: true,  slots: 8,  time: "10:00 – 13:00" },
  { day: "Wednesday", active: true,  slots: 14, time: "14:00 – 18:00" },
  { day: "Thursday",  active: true,  slots: 10, time: "09:00 – 12:00" },
  { day: "Friday",    active: false, slots: 0,  time: "Off" },
  { day: "Saturday",  active: false,  slots: 0,  time: "off" },
];

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "overview",     label: "Overview",     Icon: LayoutDashboard },
  { id: "appointments", label: "Appointments", Icon: CalendarDays    },
  { id: "patients",     label: "Patients",     Icon: Users           },
  { id: "schedule",     label: "Schedule",     Icon: CalendarClock   },
  { id: "profile",      label: "Profile",      Icon: UserCog         },
];

const STATUS_MAP = {
  Confirmed: { color: "text-amber-500",   bg: "bg-amber-50   dark:bg-amber-900/20",   border: "border-amber-200   dark:border-amber-800/40",   dot: "bg-amber-400"   },
  Completed: { color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20", border: "border-emerald-200 dark:border-emerald-800/40",  dot: "bg-emerald-400" },
  Cancelled: { color: "text-rose-500",    bg: "bg-rose-50    dark:bg-rose-900/20",    border: "border-rose-200    dark:border-rose-800/40",    dot: "bg-rose-400"    },
  Pending:   { color: "text-sky-500",     bg: "bg-sky-50     dark:bg-sky-900/20",     border: "border-sky-200     dark:border-sky-800/40",     dot: "bg-sky-400"     },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const fmtDate = (s) =>
  new Date(s).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

const fmtTime = (s) => {
  if (!s) return "";
  const [h, m] = s.split(":");
  const d = new Date();
  d.setHours(+h, +m);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
};

const initials = (name) =>
  name.replace(/^Dr\.?\s*/i, "")
    .split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

const today = () =>
  new Date().toISOString().split("T")[0];

// ─────────────────────────────────────────────────────────────────────────────
// SHARED UI PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP.Pending;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${s.bg} ${s.border} ${s.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

// Doctor avatar uses teal→blue to distinguish from patient's cyan→purple
function Avatar({ name, size = "md", className = "" }) {
  const sz = {
    sm: "w-8 h-8 text-[10px]",
    md: "w-11 h-11 text-sm",
    lg: "w-16 h-16 text-xl",
    xl: "w-20 h-20 text-2xl",
  }[size];
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white font-bold shrink-0 ${className}`}>
      {initials(name)}
    </div>
  );
}

// Patient avatar keeps a neutral slate tone
function PatientAvatar({ name, size = "md" }) {
  const sz = { sm: "w-8 h-8 text-[10px]", md: "w-9 h-9 text-xs" }[size];
  return (
    <div className={`${sz} rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold shrink-0`}>
      {initials(name)}
    </div>
  );
}

function Card({ children, className = "", hover = false }) {
  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl ${hover ? "hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60 transition-shadow duration-200" : ""} ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{children}</h2>
  );
}

function StatCard({ label, value, Icon, color, bg, sub }) {
  return (
    <Card hover className="p-5">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${bg}`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
      {sub && <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-1">{sub}</p>}
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: OVERVIEW
// ─────────────────────────────────────────────────────────────────────────────
function OverviewTab({ setSearchParams }) {
  const goTab = (tab) => setSearchParams({ tab });

  // Today's queue
  const todayStr = "2025-04-02"; // replace with today() in production
  const todayAppts = APPOINTMENTS.filter((a) => a.date === todayStr);
  const todayDone  = todayAppts.filter((a) => a.status === "Completed").length;
  const todayLeft  = todayAppts.filter((a) => a.status === "Pending" || a.status === "Confirmed").length;
  const nextPatient = todayAppts.find((a) => a.status === "Confirmed" || a.status === "Pending");

  const stats = [
    { label: "Today's Patients", value: todayAppts.length,  Icon: CalendarDays,   color: "text-teal-500",    bg: "bg-teal-500/10",    sub: `${todayDone} done · ${todayLeft} remaining` },
    { label: "Total Patients",   value: DOCTOR.total_patients, Icon: Users,        color: "text-blue-500",    bg: "bg-blue-500/10",    sub: "All time"                                   },
    { label: "Consultation Fee", value: `৳${DOCTOR.fee}`,   Icon: DollarSign,     color: "text-emerald-500", bg: "bg-emerald-500/10", sub: "Per visit"                                  },
    { label: "Rating",           value: DOCTOR.rating,      Icon: Star,           color: "text-amber-500",   bg: "bg-amber-500/10",   sub: "Out of 5.0"                                 },
  ];

  // Recent activity (last 3 completed)
  const recent = APPOINTMENTS.filter((a) => a.status === "Completed").slice(0, 3);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-500 via-blue-600 to-blue-700 p-7 mb-7 text-white">
        <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full bg-white/5" />
        <div className="absolute bottom-0 right-20 w-28 h-28 rounded-full bg-white/5" />
        <div className="flex flex-wrap items-center gap-5">
          <Avatar name={DOCTOR.doctor_name} size="lg" className="ring-2 ring-white/30" />
          <div>
            <p className="text-xs uppercase tracking-widest text-teal-100 mb-1">Doctor Portal</p>
            <h2 className="text-2xl font-bold mb-0.5">{DOCTOR.doctor_name}</h2>
            <p className="text-sm text-blue-100">{DOCTOR.specialization} · {DOCTOR.branch}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white text-xs font-semibold px-3 py-1 rounded-full">
                <BadgeCheck className="w-3.5 h-3.5" /> Verified Doctor
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white text-xs font-semibold px-3 py-1 rounded-full">
                <Star className="w-3.5 h-3.5 fill-white" /> {DOCTOR.rating} Rating
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's queue */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Today's Queue</h3>
            <button onClick={() => goTab("appointments")} className="text-xs text-teal-500 hover:text-teal-600 font-semibold flex items-center gap-1">
              Manage <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
              <span>{todayDone} completed</span>
              <span>{todayAppts.length} total</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all duration-700"
                style={{ width: todayAppts.length ? `${(todayDone / todayAppts.length) * 100}%` : "0%" }}
              />
            </div>
          </div>

          {/* Next patient */}
          {nextPatient ? (
            <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800/40 rounded-xl p-3.5">
              <p className="text-[10px] uppercase tracking-widest text-teal-500 font-bold mb-2">Next Patient</p>
              <div className="flex items-center gap-3">
                <PatientAvatar name={nextPatient.patient} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{nextPatient.patient}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{nextPatient.note}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-teal-600 dark:text-teal-400">{fmtTime(nextPatient.time)}</p>
                  <p className="text-[10px] text-slate-400">Serial #{nextPatient.serial}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400 text-center py-4">All done for today 🎉</p>
          )}

          {/* Remaining list */}
          {todayAppts.filter(a => a.status !== "Completed" && a.id !== nextPatient?.id).slice(0, 3).map((a) => (
            <div key={a.id} className="flex items-center gap-3 py-2.5 border-t border-slate-100 dark:border-slate-800 mt-2">
              <PatientAvatar name={a.patient} size="sm" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex-1 truncate">{a.patient}</p>
              <p className="text-xs text-slate-400 shrink-0">{fmtTime(a.time)}</p>
              <StatusBadge status={a.status} />
            </div>
          ))}
        </Card>

        {/* Recent completed */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Recent Activity</h3>
            <button onClick={() => goTab("patients")} className="text-xs text-teal-500 hover:text-teal-600 font-semibold flex items-center gap-1">
              All patients <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-0">
            {recent.map((a, i) => (
              <div key={a.id} className={`flex items-center gap-3 py-3 ${i < recent.length - 1 ? "border-b border-slate-100 dark:border-slate-800" : ""}`}>
                <PatientAvatar name={a.patient} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{a.patient}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{a.note}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px] text-slate-400">{fmtDate(a.date)}</p>
                  <StatusBadge status={a.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: APPOINTMENTS
// ─────────────────────────────────────────────────────────────────────────────
function AppointmentsTab() {
  const [filter, setFilter] = useState("All");
  const [statuses, setStatuses] = useState(() =>
    Object.fromEntries(APPOINTMENTS.map((a) => [a.id, a.status]))
  );

  const filtered =
    filter === "All" ? APPOINTMENTS : APPOINTMENTS.filter((a) => statuses[a.id] === filter);

  const cycle = (id) => {
    const order = ["Pending", "Confirmed", "Completed", "Cancelled"];
    setStatuses((prev) => {
      const idx = order.indexOf(prev[id]);
      return { ...prev, [id]: order[(idx + 1) % order.length] };
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <SectionHeading>Appointments</SectionHeading>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["All", "Confirmed", "Pending", "Completed", "Cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition ${
              filter === s
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent"
                : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((a, i) => (
            <motion.div
              key={a.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card hover className="p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Patient avatar + info */}
                  <PatientAvatar name={a.patient} />
                  <div className="flex-1 min-w-[140px]">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{a.patient}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {a.gender} · {a.age} yrs · {a.note}
                    </p>
                  </div>

                  {/* Date / time — hidden on smallest screens */}
                  <div className="hidden sm:flex flex-col gap-1 min-w-[130px]">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <CalendarDays className="w-3.5 h-3.5 text-slate-400" /> {fmtDate(a.date)}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {fmtTime(a.time)} · Serial #{a.serial}
                    </div>
                  </div>

                  {/* Status badge */}
                  <StatusBadge status={statuses[a.id]} />

                  {/* Quick status toggle */}
                  <button
                    onClick={() => cycle(a.id)}
                    title="Cycle status"
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-500 transition shrink-0"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile date row */}
                <div className="sm:hidden flex flex-wrap gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-1 text-[11px] text-slate-400"><CalendarDays className="w-3 h-3" />{fmtDate(a.date)}</span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400"><Clock className="w-3 h-3" />{fmtTime(a.time)}</span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400"><Hash className="w-3 h-3" />Serial #{a.serial}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-sm">No appointments found</div>
        )}
      </div>

      <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-4 text-center">
        Tap <ChevronRight className="inline w-3 h-3" /> on any row to cycle its status
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: PATIENTS
// ─────────────────────────────────────────────────────────────────────────────
function PatientsTab() {
  const [query, setQuery] = useState("");
  const filtered = PATIENTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.condition.toLowerCase().includes(query.toLowerCase()) ||
      p.city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <SectionHeading>My Patients</SectionHeading>
        <p className="text-sm text-slate-400 dark:text-slate-500 -mt-4">{PATIENTS.length} patients total</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, condition, or city…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 transition"
        />
      </div>

      <div className="flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card hover className="p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-4">
                  <PatientAvatar name={p.name} />

                  <div className="flex-1 min-w-[140px]">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{p.name}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {p.gender} · {p.age} yrs · {p.city}
                    </p>
                  </div>

                  {/* Condition badge */}
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800/40">
                    {p.condition}
                  </span>

                  {/* Visit count */}
                  <div className="hidden sm:flex flex-col items-end min-w-[80px]">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{p.visits} visits</p>
                    <p className="text-[11px] text-slate-400">Last: {fmtDate(p.last_visit)}</p>
                  </div>
                </div>

                {/* Mobile extra row */}
                <div className="sm:hidden flex flex-wrap gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                  <span>{p.visits} visits</span>
                  <span>Last: {fmtDate(p.last_visit)}</span>
                  <span><Phone className="inline w-3 h-3 mr-0.5" />{p.mobile}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-sm">No patients match your search</div>
        )}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: SCHEDULE
// ─────────────────────────────────────────────────────────────────────────────
function ScheduleTab() {
  const totalSlots = SCHEDULE.reduce((a, s) => a + s.slots, 0);
  const activeDays = SCHEDULE.filter((s) => s.active).length;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <SectionHeading>Weekly Schedule</SectionHeading>
        <button className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition">
          <Pencil className="w-4 h-4" /> Edit Schedule
        </button>
      </div>

      {/* Summary pills */}
      <div className="flex flex-wrap gap-3 mb-7">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800/40">
          <CalendarClock className="w-4 h-4 text-teal-500" />
          <span className="text-sm font-semibold text-teal-700 dark:text-teal-300">{activeDays} active days / week</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40">
          <Users className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">{totalSlots} slots / week</span>
        </div>
      </div>

      {/* Day cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {SCHEDULE.map((s, i) => (
          <motion.div
            key={s.day}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className={`p-5 ${s.active ? "" : "opacity-60"}`}>
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-slate-900 dark:text-white text-sm">{s.day}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  s.active
                    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                }`}>
                  {s.active ? "Active" : "Off"}
                </span>
              </div>

              {s.active ? (
                <>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <Clock className="w-3.5 h-3.5" /> {s.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <Users className="w-3.5 h-3.5" /> {s.slots} patient slots
                  </div>
                  {/* Slot progress dots */}
                  <div className="flex flex-wrap gap-1">
                    {Array.from({ length: Math.min(s.slots, 14) }).map((_, j) => (
                      <span key={j} className="w-2 h-2 rounded-full bg-teal-400/60 dark:bg-teal-500/40" />
                    ))}
                    {s.slots > 14 && <span className="text-[10px] text-slate-400">+{s.slots - 14}</span>}
                  </div>
                </>
              ) : (
                <p className="text-xs text-slate-400 dark:text-slate-600">No appointments</p>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: PROFILE
// ─────────────────────────────────────────────────────────────────────────────
function ProfileTab() {
  const fields = [
    { label: "Full Name",        value: DOCTOR.doctor_name,      Icon: UserCog          },
    { label: "Gender",           value: DOCTOR.gender,           Icon: Activity         },
    { label: "Date of Birth",    value: fmtDate(DOCTOR.dob),     Icon: CalendarDays     },
    { label: "Specialization",   value: DOCTOR.specialization,   Icon: BriefcaseMedical },
    { label: "Qualifications",   value: DOCTOR.qualifications,   Icon: GraduationCap    },
    { label: "Department",       value: DOCTOR.department,       Icon: Building2        },
    { label: "Branch",           value: DOCTOR.branch,           Icon: MapPin           },
    { label: "Consultation Fee", value: `৳${DOCTOR.fee} / visit`, Icon: DollarSign      },
    { label: "Mobile",           value: DOCTOR.mobile,           Icon: Phone            },
    { label: "Email",            value: DOCTOR.email,            Icon: Mail             },
    { label: "Joined",           value: fmtDate(DOCTOR.joining_date), Icon: CalendarDays },
    { label: "Rating",           value: `${DOCTOR.rating} / 5.0`, Icon: Star            },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

      {/* Hero card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-500 via-blue-600 to-blue-700 p-7 mb-6 text-white">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute bottom-0 right-20 w-28 h-28 rounded-full bg-white/5" />
        <div className="flex flex-wrap items-center gap-5">
          <Avatar name={DOCTOR.doctor_name} size="xl" className="ring-2 ring-white/30" />
          <div className="flex-1">
            <p className="text-xl font-bold">{DOCTOR.doctor_name}</p>
            <p className="text-sm text-blue-100 mt-0.5">{DOCTOR.specialization}</p>
            <p className="text-xs text-blue-200 mt-1">{DOCTOR.qualifications}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white text-xs font-semibold px-3 py-1 rounded-full">
                <Building2 className="w-3 h-3" /> {DOCTOR.branch}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white text-xs font-semibold px-3 py-1 rounded-full">
                <Users className="w-3 h-3" /> {DOCTOR.total_patients} patients
              </span>
            </div>
          </div>
          <button className="self-start inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 transition border border-white/30 text-white text-sm font-semibold px-4 py-2 rounded-xl">
            <Pencil className="w-3.5 h-3.5" /> Edit
          </button>
        </div>
      </div>

      {/* Fields grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {fields.map((f, i) => (
          <motion.div key={f.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Card className="p-4 flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0">
                <f.Icon className="w-4 h-4 text-teal-500" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">{f.label}</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{f.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
export default function DoctorDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── URL-based tab state ─────────────────────────────────────────────────────
  const rawTab = searchParams.get("tab");
  const activeTab = TABS.find((t) => t.id === rawTab) ? rawTab : "overview";
  const setTab = (id) => setSearchParams({ tab: id }, { replace: false });

  // ── Dark mode (reads <html class="dark"> — same as Navbar) ─────────────────
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    setDark(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // ── Mobile sidebar ──────────────────────────────────────────────────────────
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target))
        setSidebarOpen(false);
    };
    if (sidebarOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [sidebarOpen]);

  // ── Tab content ─────────────────────────────────────────────────────────────
  const CONTENT = {
    overview:     <OverviewTab setSearchParams={setSearchParams} />,
    appointments: <AppointmentsTab />,
    patients:     <PatientsTab />,
    schedule:     <ScheduleTab />,
    profile:      <ProfileTab />,
  };

  // ── Sidebar (shared between desktop fixed + mobile drawer) ─────────────────
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 px-5 py-5 mb-4">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center shadow-md">
          <Stethoscope className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
            DoctorsForHome
          </p>
          <p className="text-[9px] tracking-widest text-slate-400 dark:text-slate-500">DOCTOR PORTAL</p>
        </div>
      </Link>

      {/* Doctor mini-card */}
      <div className="mx-4 mb-6 p-3.5 rounded-2xl bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-slate-200 dark:border-slate-700/50 flex items-center gap-3">
        <Avatar name={DOCTOR.doctor_name} size="sm" />
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{DOCTOR.doctor_name}</p>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{DOCTOR.specialization}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-600 px-3 mb-2">Navigation</p>
        {TABS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => { setTab(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? "bg-gradient-to-r from-teal-500/15 to-blue-500/10 text-teal-600 dark:text-teal-400 border border-teal-200/50 dark:border-teal-800/40"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-teal-500" : "text-slate-400"}`} />
              {label}
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-500" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-5 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
        >
          {dark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
        <Link
          to="/"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* ── DESKTOP SIDEBAR ──────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40">
        <SidebarContent />
      </aside>

      {/* ── MOBILE DRAWER ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              ref={sidebarRef}
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 left-0 w-60 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── MAIN AREA ─────────────────────────────────────────────────────────── */}
      <div className="lg:pl-60 flex flex-col min-h-screen">

        {/* Topbar */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 px-5 sm:px-7">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400 dark:text-slate-500 hidden sm:inline">Doctor Dashboard</span>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">/</span>
            <span className="font-semibold text-slate-800 dark:text-white capitalize">{activeTab}</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="hidden sm:flex w-9 h-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              {dark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Doctor chip */}
            <div className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <Avatar name={DOCTOR.doctor_name} size="sm" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 hidden sm:inline">
                {DOCTOR.doctor_name.replace(/^Dr\.?\s*/i, "").split(" ")[0]}
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-5 sm:p-7 max-w-5xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <div key={activeTab}>{CONTENT[activeTab]}</div>
          </AnimatePresence>
        </main>

        {/* ── MOBILE BOTTOM NAV ─────────────────────────────────────────────── */}
        <nav className="lg:hidden sticky bottom-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 flex justify-around py-2 px-1 z-30">
          {TABS.map(({ id, label, Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition min-w-0 ${
                  isActive ? "text-teal-500" : "text-slate-400 dark:text-slate-500"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-semibold truncate">{label}</span>
                {isActive && <span className="w-1 h-1 rounded-full bg-teal-500" />}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}