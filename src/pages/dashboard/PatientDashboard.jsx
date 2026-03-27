/**
 * PatientDashboard.jsx
 *
 * Requires (already in project):
 *   react-router-dom  →  useSearchParams, Link, useNavigate
 *   framer-motion     →  motion, AnimatePresence
 *   lucide-react      →  icons
 *   tailwindcss       →  utility classes  (dark-mode: "class")
 *
 * URL-based tab state:  /patient/dashboard?tab=appointments
 * Preserves active tab across refresh / back-forward navigation.
 *
 * Dark mode driven by  <html class="dark">  (same as Navbar).
 */

import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  FlaskConical,
  UserCircle2,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  ArrowRight,
  Stethoscope,
  Clock,
  MapPin,
  Hash,
  Phone,
  Mail,
  ChevronDown,
  Download,
  Plus,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Timer,
  Star,
  TrendingUp,
  Activity,
  FileText,
  Pencil,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA  (replace with API calls)
// ─────────────────────────────────────────────────────────────────────────────
const PATIENT = {
  patient_name: "Refadul Islam",
  age: 28,
  gender: "Male",
  mobile: "01712-345678",
  email: "refadul.islam@gmail.com",
  city: "Dhaka",
  account_created: "2024-01-15",
  blood_group: "B+",
};

const APPOINTMENTS = [
  { id: 1, doctor: "Dr. Arif Hossain",   specialty: "Cardiology",   date: "2025-04-02", time: "10:00:00", serial: 4,  status: "Confirmed", branch: "Gulshan Branch"   },
  { id: 2, doctor: "Dr. Meera Sultana",  specialty: "Dermatology",  date: "2025-03-18", time: "14:30:00", serial: 7,  status: "Completed", branch: "Dhanmondi Branch" },
  { id: 3, doctor: "Dr. Tanvir Ahmed",   specialty: "Neurology",    date: "2025-03-05", time: "09:00:00", serial: 2,  status: "Completed", branch: "Gulshan Branch"   },
  { id: 4, doctor: "Dr. Rupa Chowdhury", specialty: "Orthopedics",  date: "2025-02-20", time: "11:30:00", serial: 9,  status: "Cancelled", branch: "Mirpur Branch"    },
  { id: 5, doctor: "Dr. Sajid Islam",    specialty: "Ophthalmology",date: "2025-01-30", time: "15:00:00", serial: 3,  status: "Completed", branch: "Uttara Branch"    },
];

const DIAGNOSES = [
  { id: 1, test: "Complete Blood Count (CBC)", date: "2025-03-18T14:45:00", report: true,  doctor: "Dr. Meera Sultana"  },
  { id: 2, test: "Lipid Profile",              date: "2025-03-05T09:30:00", report: true,  doctor: "Dr. Tanvir Ahmed"   },
  { id: 3, test: "Thyroid Function Test",      date: "2025-02-20T12:00:00", report: true,  doctor: "Dr. Rupa Chowdhury" },
  { id: 4, test: "Chest X-Ray",                date: "2025-01-10T10:15:00", report: false, doctor: "Dr. Arif Hossain"   },
  { id: 5, test: "HbA1c (Glycated Hgb)",       date: "2024-12-05T08:00:00", report: true,  doctor: "Dr. Sajid Islam"    },
];

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "overview",      label: "Overview",      Icon: LayoutDashboard },
  { id: "appointments",  label: "Appointments",  Icon: CalendarDays    },
  { id: "diagnoses",     label: "Diagnoses",     Icon: FlaskConical    },
  { id: "profile",       label: "Profile",       Icon: UserCircle2     },
];

const STATUS_MAP = {
  Confirmed: { Icon: Timer,        color: "text-amber-500",   bg: "bg-amber-50   dark:bg-amber-900/20",   border: "border-amber-200 dark:border-amber-800/40",   dot: "bg-amber-400"  },
  Completed: { Icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20", border: "border-emerald-200 dark:border-emerald-800/40", dot: "bg-emerald-400"},
  Cancelled: { Icon: XCircle,     color: "text-rose-500",    bg: "bg-rose-50    dark:bg-rose-900/20",    border: "border-rose-200   dark:border-rose-800/40",   dot: "bg-rose-400"   },
  Pending:   { Icon: AlertCircle,  color: "text-sky-500",     bg: "bg-sky-50     dark:bg-sky-900/20",     border: "border-sky-200    dark:border-sky-800/40",    dot: "bg-sky-400"    },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const fmtDate = (s) =>
  new Date(s).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

const fmtTime = (s) => {
  if (!s) return "";
  const [h, m] = s.split(":");
  const d = new Date(); d.setHours(+h, +m);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
};

const initials = (name) =>
  name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
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

function Avatar({ name, size = "md", className = "" }) {
  const sz = { sm: "w-8 h-8 text-xs", md: "w-11 h-11 text-sm", lg: "w-16 h-16 text-xl" }[size];
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold shrink-0 ${className}`}>
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
    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 font-display">{children}</h2>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: OVERVIEW
// ─────────────────────────────────────────────────────────────────────────────
function OverviewTab({ navigate, setSearchParams }) {
  const next = APPOINTMENTS.find((a) => a.status === "Confirmed");
  const completed = APPOINTMENTS.filter((a) => a.status === "Completed").length;

  const stats = [
    { label: "Total Visits",     value: APPOINTMENTS.length, Icon: CalendarDays,  color: "text-cyan-500",    bg: "bg-cyan-500/10"    },
    { label: "Completed",        value: completed,           Icon: CheckCircle2,  color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Tests Taken",      value: DIAGNOSES.length,   Icon: FlaskConical,  color: "text-violet-500",  bg: "bg-violet-500/10"  },
    { label: "Reports Ready",    value: DIAGNOSES.filter(d=>d.report).length, Icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
  ];

  const goTab = (tab) => setSearchParams({ tab });

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 p-7 mb-7 text-white">
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute bottom-0 right-16 w-24 h-24 rounded-full bg-white/5" />
        <p className="text-xs uppercase tracking-widest text-cyan-100 mb-1">Patient Dashboard</p>
        <h2 className="text-2xl font-bold font-display mb-1">Good day, {PATIENT.patient_name.split(" ")[0]} 👋</h2>
        <p className="text-sm text-blue-100 max-w-md">
          {next
            ? `Your next appointment is on ${fmtDate(next.date)} with ${next.doctor}.`
            : "You have no upcoming appointments. Book one below."}
        </p>
        <button
          onClick={() => goTab("appointments")}
          className="mt-4 inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 transition border border-white/25 text-white text-sm font-semibold px-4 py-2 rounded-xl"
        >
          <Plus className="w-4 h-4" /> Book Appointment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card hover className="p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.bg}`}>
                <s.Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white font-display">{s.value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming appointment */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Upcoming</h3>
            <button onClick={() => goTab("appointments")} className="text-xs text-cyan-500 hover:text-cyan-600 font-semibold flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          {next ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Avatar name={next.doctor} size="md" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{next.doctor}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{next.specialty}</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { Icon: CalendarDays, text: fmtDate(next.date) },
                  { Icon: Clock,        text: fmtTime(next.time) },
                  { Icon: MapPin,       text: next.branch },
                  { Icon: Hash,         text: `Serial No. ${next.serial}` },
                ].map(({ Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <Icon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
              <div className="mt-4"><StatusBadge status={next.status} /></div>
            </div>
          ) : (
            <p className="text-sm text-slate-400">No upcoming appointments</p>
          )}
        </Card>

        {/* Recent tests */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Recent Tests</h3>
            <button onClick={() => goTab("diagnoses")} className="text-xs text-cyan-500 hover:text-cyan-600 font-semibold flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {DIAGNOSES.slice(0, 4).map((d) => (
              <div key={d.id} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
                    <FlaskConical className="w-4 h-4 text-violet-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{d.test}</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">{fmtDate(d.date)}</p>
                  </div>
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-2 ${d.report ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}>
                  {d.report ? "Ready" : "Pending"}
                </span>
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
  const statuses = ["All", "Confirmed", "Completed", "Cancelled"];
  const filtered = filter === "All" ? APPOINTMENTS : APPOINTMENTS.filter((a) => a.status === filter);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <SectionHeading>Appointments</SectionHeading>
        <button className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition">
          <Plus className="w-4 h-4" /> Book New
        </button>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statuses.map((s) => (
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
              transition={{ delay: i * 0.04 }}
            >
              <Card hover className="p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-4">
                  <Avatar name={a.doctor} size="md" />
                  <div className="flex-1 min-w-[120px]">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{a.doctor}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{a.specialty} · {a.branch}</p>
                  </div>
                  <div className="hidden sm:flex flex-col gap-1 min-w-[140px]">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <CalendarDays className="w-3.5 h-3.5 text-slate-400" /> {fmtDate(a.date)}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {fmtTime(a.time)} · Serial #{a.serial}
                    </div>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
                {/* mobile-only date row */}
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
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: DIAGNOSES
// ─────────────────────────────────────────────────────────────────────────────
function DiagnosesTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <SectionHeading>Diagnosis History</SectionHeading>
      <div className="flex flex-col gap-3">
        {DIAGNOSES.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card hover className="p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-pink-500/10 flex items-center justify-center shrink-0">
                  <FlaskConical className="w-5 h-5 text-violet-500" />
                </div>
                <div className="flex-1 min-w-[140px]">
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{d.test}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Ordered by {d.doctor}</p>
                </div>
                <div className="hidden sm:block text-xs text-slate-400 dark:text-slate-500 min-w-[100px]">
                  {fmtDate(d.date)}
                </div>
                {d.report ? (
                  <button className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:opacity-90 transition">
                    <Download className="w-3.5 h-3.5" /> Report
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400">
                    <AlertCircle className="w-3.5 h-3.5" /> Pending
                  </span>
                )}
              </div>
              <div className="sm:hidden mt-2 text-[11px] text-slate-400">{fmtDate(d.date)}</div>
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
    { label: "Full Name",     value: PATIENT.patient_name,                   Icon: UserCircle2  },
    { label: "Age",           value: `${PATIENT.age} years`,                 Icon: Activity     },
    { label: "Gender",        value: PATIENT.gender,                         Icon: Star         },
    { label: "Blood Group",   value: PATIENT.blood_group,                    Icon: TrendingUp   },
    { label: "Mobile",        value: PATIENT.mobile,                         Icon: Phone        },
    { label: "Email",         value: PATIENT.email,                          Icon: Mail         },
    { label: "City",          value: PATIENT.city,                           Icon: MapPin       },
    { label: "Member Since",  value: fmtDate(PATIENT.account_created),       Icon: CalendarDays },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* Hero card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 p-7 mb-6 text-white">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute bottom-0 right-20 w-28 h-28 rounded-full bg-white/5" />
        <div className="flex flex-wrap items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-3xl font-bold font-display">
            {initials(PATIENT.patient_name)}
          </div>
          <div>
            <p className="text-xl font-bold font-display">{PATIENT.patient_name}</p>
            <p className="text-sm text-blue-100 mt-0.5">Patient · {PATIENT.city}</p>
            <p className="text-xs text-blue-200 mt-1">Member since {fmtDate(PATIENT.account_created)}</p>
          </div>
          <button className="ml-auto inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 transition border border-white/30 text-white text-sm font-semibold px-4 py-2 rounded-xl">
            <Pencil className="w-3.5 h-3.5" /> Edit Profile
          </button>
        </div>
      </div>

      {/* Fields grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {fields.map((f, i) => (
          <motion.div key={f.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card className="p-4 flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                <f.Icon className="w-4 h-4 text-cyan-500" />
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
export default function PatientDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // ── URL-based tab state ─────────────────────────────────────────────────────
  const rawTab = searchParams.get("tab");
  const activeTab = TABS.find((t) => t.id === rawTab) ? rawTab : "overview";

  const setTab = (id) => {
    setSearchParams({ tab: id }, { replace: false });
  };

  // ── Dark mode (reads <html class="dark"> set by Navbar) ────────────────────
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    setDark(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  // ── Mobile sidebar ──────────────────────────────────────────────────────────
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };
    if (sidebarOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [sidebarOpen]);

  // Sync dark state if Navbar toggles it externally
  useEffect(() => {
    const obs = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains("dark"));
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // ── Tab content map ─────────────────────────────────────────────────────────
  const CONTENT = {
    overview:     <OverviewTab navigate={navigate} setSearchParams={setSearchParams} />,
    appointments: <AppointmentsTab />,
    diagnoses:    <DiagnosesTab />,
    profile:      <ProfileTab />,
  };

  // ── Sidebar inner (shared between desktop + mobile drawer) ─────────────────
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 px-5 py-5 mb-4">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-md">
          <Stethoscope className="w-4.5 h-4.5 text-white w-4 h-4" />
        </div>
        <div>
          <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">DoctorsForHome</p>
          <p className="text-[9px] tracking-widest text-slate-400 dark:text-slate-500">PATIENT PORTAL</p>
        </div>
      </Link>

      {/* Patient avatar */}
      <div className="mx-4 mb-6 p-3.5 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-slate-200 dark:border-slate-700/50 flex items-center gap-3">
        <Avatar name={PATIENT.patient_name} size="sm" />
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{PATIENT.patient_name}</p>
          <p className="text-[10px] text-slate-400 dark:text-slate-500">Patient · ID #4821</p>
        </div>
      </div>

      {/* Nav items */}
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
                  ? "bg-gradient-to-r from-cyan-500/15 to-purple-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200/50 dark:border-cyan-800/40"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon className={`w-4.5 h-4.5 w-4 h-4 shrink-0 ${isActive ? "text-cyan-500" : "text-slate-400"}`} />
              {label}
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-500" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom actions */}
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">

      {/* ── DESKTOP SIDEBAR ──────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40">
        <SidebarContent />
      </aside>

      {/* ── MOBILE DRAWER OVERLAY ─────────────────────────────────────────────── */}
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
              className="fixed inset-y-0 left-0 w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 lg:hidden flex flex-col"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── MAIN AREA ─────────────────────────────────────────────────────────── */}
      <div className="lg:pl-60 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 px-5 sm:px-7">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400 dark:text-slate-500 hidden sm:inline">Dashboard</span>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">/</span>
            <span className="font-semibold text-slate-800 dark:text-white capitalize">{activeTab}</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Theme toggle — desktop */}
            <button
              onClick={toggleTheme}
              className="hidden sm:flex w-9 h-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              {dark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Patient chip */}
            <div className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <Avatar name={PATIENT.patient_name} size="sm" className="w-7 h-7 text-[10px]" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 hidden sm:inline">
                {PATIENT.patient_name.split(" ")[0]}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 sm:p-7 max-w-5xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <div key={activeTab}>
              {CONTENT[activeTab]}
            </div>
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
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition min-w-0 ${
                  isActive ? "text-cyan-500" : "text-slate-400 dark:text-slate-500"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-semibold truncate">{label}</span>
                {isActive && <span className="w-1 h-1 rounded-full bg-cyan-500" />}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}