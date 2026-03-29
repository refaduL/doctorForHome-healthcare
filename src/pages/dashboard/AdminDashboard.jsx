/**
 * AdminDashboard.jsx
 * pages/dashboard/AdminDashboard.jsx
 *
 * Tabs (URL-based ?tab=...):
 *   overview      — system-wide KPIs, recent activity, branch summary
 *   doctors       — all doctors, searchable, filterable by branch / dept
 *   patients      — full patient registry, searchable
 *   appointments  — all appointments across every doctor & branch
 *   branches      — branch & department management
 *   profile       — admin manager profile
 *
 * Accent: violet → indigo  (distinct from patient cyan→purple, doctor teal→blue)
 * Route:  /admin/dashboard?tab=overview
 */

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  DollarSign,
  FlaskConical,
  GitBranch,
  Layers,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Moon,
  Pencil,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Star,
  Stethoscope,
  Sun,
  Trash2,
  TrendingDown,
  TrendingUp,
  UserCog,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA  (replace with real API calls)
// ─────────────────────────────────────────────────────────────────────────────
const ADMIN = {
  manager_id: 1,
  manager_name: "Fatema Khanam",
  gender: "Female",
  dob: "1985-09-22",
  mobile: "01955-667788",
  email: "fatema.khanam@dfh.com",
  joining_date: "2019-07-01",
  branch: "Head Office — Gulshan",
};

const BRANCHES = [
  {
    id: 1,
    location: "Gulshan Branch",
    doctors: 18,
    patients: 1240,
    appointments_today: 47,
  },
  {
    id: 2,
    location: "Dhanmondi Branch",
    doctors: 14,
    patients: 980,
    appointments_today: 38,
  },
  {
    id: 3,
    location: "Mirpur Branch",
    doctors: 11,
    patients: 730,
    appointments_today: 29,
  },
  {
    id: 4,
    location: "Uttara Branch",
    doctors: 9,
    patients: 510,
    appointments_today: 21,
  },
  {
    id: 5,
    location: "Chattogram Branch",
    doctors: 12,
    patients: 640,
    appointments_today: 25,
  },
];

const DEPARTMENTS = [
  { id: 1, name: "Cardiology", doctors: 8, labs: 2 },
  { id: 2, name: "Dermatology", doctors: 6, labs: 1 },
  { id: 3, name: "Neurology", doctors: 7, labs: 2 },
  { id: 4, name: "Orthopedics", doctors: 9, labs: 3 },
  { id: 5, name: "Ophthalmology", doctors: 5, labs: 1 },
  { id: 6, name: "Pediatrics", doctors: 7, labs: 2 },
  { id: 7, name: "Oncology", doctors: 4, labs: 2 },
  { id: 8, name: "Radiology", doctors: 6, labs: 4 },
];

const DOCTORS = [
  {
    id: 1,
    name: "Dr. Arif Hossain",
    specialty: "Cardiology",
    branch: "Gulshan Branch",
    dept: "Cardiology",
    fee: 1200,
    joining: "2020-03-01",
    rating: 4.8,
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Meera Sultana",
    specialty: "Dermatologist",
    branch: "Dhanmondi Branch",
    dept: "Dermatology",
    fee: 900,
    joining: "2021-06-15",
    rating: 4.6,
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Tanvir Ahmed",
    specialty: "Neurologist",
    branch: "Gulshan Branch",
    dept: "Neurology",
    fee: 1100,
    joining: "2019-11-01",
    rating: 4.7,
    status: "Active",
  },
  {
    id: 4,
    name: "Dr. Rupa Chowdhury",
    specialty: "Orthopedist",
    branch: "Mirpur Branch",
    dept: "Orthopedics",
    fee: 1000,
    joining: "2022-01-10",
    rating: 4.5,
    status: "Active",
  },
  {
    id: 5,
    name: "Dr. Sajid Islam",
    specialty: "Ophthalmology",
    branch: "Uttara Branch",
    dept: "Ophthalmology",
    fee: 800,
    joining: "2021-08-20",
    rating: 4.4,
    status: "Active",
  },
  {
    id: 6,
    name: "Dr. Lailun Nahar",
    specialty: "Pediatrician",
    branch: "Chattogram Branch",
    dept: "Pediatrics",
    fee: 850,
    joining: "2020-05-12",
    rating: 4.9,
    status: "Active",
  },
  {
    id: 7,
    name: "Dr. Kamrul Hasan",
    specialty: "Oncologist",
    branch: "Gulshan Branch",
    dept: "Oncology",
    fee: 1500,
    joining: "2018-09-01",
    rating: 4.7,
    status: "On Leave",
  },
  {
    id: 8,
    name: "Dr. Shirin Akter",
    specialty: "Radiologist",
    branch: "Dhanmondi Branch",
    dept: "Radiology",
    fee: 950,
    joining: "2023-02-28",
    rating: 4.3,
    status: "Active",
  },
];

const PATIENTS = [
  {
    id: 101,
    name: "Nadia Rahman",
    age: 28,
    gender: "Female",
    mobile: "01712-345678",
    city: "Dhaka",
    joined: "2024-01-15",
    visits: 4,
    branch: "Gulshan Branch",
  },
  {
    id: 102,
    name: "Karim Uddin",
    age: 45,
    gender: "Male",
    mobile: "01611-998877",
    city: "Chattogram",
    joined: "2024-02-20",
    visits: 2,
    branch: "Dhanmondi Branch",
  },
  {
    id: 103,
    name: "Sumaiya Akter",
    age: 33,
    gender: "Female",
    mobile: "01911-445566",
    city: "Dhaka",
    joined: "2024-03-05",
    visits: 1,
    branch: "Gulshan Branch",
  },
  {
    id: 104,
    name: "Rafiq Hasan",
    age: 60,
    gender: "Male",
    mobile: "01511-332211",
    city: "Sylhet",
    joined: "2023-11-10",
    visits: 6,
    branch: "Mirpur Branch",
  },
  {
    id: 105,
    name: "Tania Begum",
    age: 52,
    gender: "Female",
    mobile: "01811-667788",
    city: "Dhaka",
    joined: "2023-08-01",
    visits: 3,
    branch: "Uttara Branch",
  },
  {
    id: 106,
    name: "Jahangir Alam",
    age: 38,
    gender: "Male",
    mobile: "01712-001122",
    city: "Rajshahi",
    joined: "2024-04-01",
    visits: 2,
    branch: "Gulshan Branch",
  },
  {
    id: 107,
    name: "Nasrin Khatun",
    age: 41,
    gender: "Female",
    mobile: "01611-334455",
    city: "Dhaka",
    joined: "2023-12-18",
    visits: 5,
    branch: "Dhanmondi Branch",
  },
  {
    id: 108,
    name: "Mizanur Rahman",
    age: 55,
    gender: "Male",
    mobile: "01911-556677",
    city: "Khulna",
    joined: "2024-01-30",
    visits: 1,
    branch: "Chattogram Branch",
  },
];

const APPOINTMENTS = [
  {
    id: 1,
    patient: "Nadia Rahman",
    doctor: "Dr. Arif Hossain",
    branch: "Gulshan Branch",
    date: "2025-04-02",
    time: "09:00:00",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "Karim Uddin",
    doctor: "Dr. Arif Hossain",
    branch: "Gulshan Branch",
    date: "2025-04-02",
    time: "09:30:00",
    status: "Confirmed",
  },
  {
    id: 3,
    patient: "Sumaiya Akter",
    doctor: "Dr. Meera Sultana",
    branch: "Dhanmondi Branch",
    date: "2025-04-02",
    time: "10:00:00",
    status: "Pending",
  },
  {
    id: 4,
    patient: "Rafiq Hasan",
    doctor: "Dr. Tanvir Ahmed",
    branch: "Gulshan Branch",
    date: "2025-04-02",
    time: "10:30:00",
    status: "Pending",
  },
  {
    id: 5,
    patient: "Tania Begum",
    doctor: "Dr. Rupa Chowdhury",
    branch: "Mirpur Branch",
    date: "2025-04-01",
    time: "11:00:00",
    status: "Completed",
  },
  {
    id: 6,
    patient: "Jahangir Alam",
    doctor: "Dr. Sajid Islam",
    branch: "Uttara Branch",
    date: "2025-04-01",
    time: "11:30:00",
    status: "Completed",
  },
  {
    id: 7,
    patient: "Nasrin Khatun",
    doctor: "Dr. Lailun Nahar",
    branch: "Chattogram Branch",
    date: "2025-03-30",
    time: "09:00:00",
    status: "Completed",
  },
  {
    id: 8,
    patient: "Mizanur Rahman",
    doctor: "Dr. Kamrul Hasan",
    branch: "Gulshan Branch",
    date: "2025-03-29",
    time: "14:00:00",
    status: "Cancelled",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "overview", label: "Overview", Icon: LayoutDashboard },
  { id: "doctors", label: "Doctors", Icon: Stethoscope },
  { id: "patients", label: "Patients", Icon: Users },
  { id: "appointments", label: "Appointments", Icon: CalendarDays },
  { id: "branches", label: "Branches", Icon: GitBranch },
  { id: "profile", label: "Profile", Icon: ShieldCheck },
];

const STATUS_MAP = {
  Confirmed: {
    color: "text-amber-500",
    bg: "bg-amber-50   dark:bg-amber-900/20",
    border: "border-amber-200   dark:border-amber-800/40",
    dot: "bg-amber-400",
  },
  Completed: {
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-800/40",
    dot: "bg-emerald-400",
  },
  Cancelled: {
    color: "text-rose-500",
    bg: "bg-rose-50    dark:bg-rose-900/20",
    border: "border-rose-200    dark:border-rose-800/40",
    dot: "bg-rose-400",
  },
  Pending: {
    color: "text-sky-500",
    bg: "bg-sky-50     dark:bg-sky-900/20",
    border: "border-sky-200     dark:border-sky-800/40",
    dot: "bg-sky-400",
  },
  Active: {
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-800/40",
    dot: "bg-emerald-400",
  },
  "On Leave": {
    color: "text-amber-500",
    bg: "bg-amber-50   dark:bg-amber-900/20",
    border: "border-amber-200   dark:border-amber-800/40",
    dot: "bg-amber-400",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const fmtDate = (s) =>
  new Date(s).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const fmtTime = (s) => {
  if (!s) return "";
  const [h, m] = s.split(":");
  const d = new Date();
  d.setHours(+h, +m);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const initials = (name) =>
  name
    .replace(/^Dr\.?\s*/i, "")
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

// ─────────────────────────────────────────────────────────────────────────────
// SHARED UI PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP.Pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${s.bg} ${s.border} ${s.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

// Admin avatar: violet→indigo
function Avatar({ name, size = "md", className = "" }) {
  const sz = {
    sm: "w-8 h-8 text-[10px]",
    md: "w-11 h-11 text-sm",
    lg: "w-16 h-16 text-xl",
    xl: "w-20 h-20 text-2xl",
  }[size];
  return (
    <div
      className={`${sz} rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold shrink-0 ${className}`}
    >
      {initials(name)}
    </div>
  );
}

// Generic entity avatar (slate tone)
function EntityAvatar({ name, size = "md" }) {
  const sz = { sm: "w-8 h-8 text-[10px]", md: "w-9 h-9 text-xs" }[size];
  return (
    <div
      className={`${sz} rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold shrink-0`}
    >
      {initials(name)}
    </div>
  );
}

function Card({ children, className = "", hover = false }) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl ${hover ? "hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60 transition-shadow duration-200" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeading({ children, action }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        {children}
      </h2>
      {action}
    </div>
  );
}

function StatCard({ label, value, Icon, color, bg, trend, sub }) {
  return (
    <Card hover className="p-5">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${bg}`}
      >
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
        {label}
      </p>
      {trend && (
        <div
          className={`flex items-center gap-1 mt-2 text-xs font-semibold ${trend > 0 ? "text-emerald-500" : "text-rose-500"}`}
        >
          {trend > 0 ? (
            <TrendingUp className="w-3.5 h-3.5" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" />
          )}
          {Math.abs(trend)}% vs last month
        </div>
      )}
      {sub && (
        <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-1">
          {sub}
        </p>
      )}
    </Card>
  );
}

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400 transition"
      />
    </div>
  );
}

function AddButton({ label }) {
  return (
    <button className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition shrink-0">
      <Plus className="w-4 h-4" /> {label}
    </button>
  );
}

// Mini horizontal bar chart for branch comparison
function MiniBar({ value, max, color = "bg-violet-500" }) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex-1">
      <div
        className={`h-full ${color} rounded-full transition-all duration-700`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: OVERVIEW
// ─────────────────────────────────────────────────────────────────────────────
function OverviewTab({ setSearchParams }) {
  const goTab = (tab) => setSearchParams({ tab });

  const totalDoctors = DOCTORS.length;
  const totalPatients = PATIENTS.length;
  const totalAppointments = APPOINTMENTS.length;
  const todayAppts = APPOINTMENTS.filter((a) => a.date === "2025-04-02").length;
  const totalBranches = BRANCHES.length;
  const totalRevenue =
    APPOINTMENTS.filter((a) => a.status === "Completed").length * 1050; // avg fee

  const stats = [
    {
      label: "Total Doctors",
      value: totalDoctors,
      Icon: Stethoscope,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      trend: +8,
    },
    {
      label: "Total Patients",
      value: totalPatients,
      Icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      trend: +14,
    },
    {
      label: "Appointments Today",
      value: todayAppts,
      Icon: CalendarDays,
      color: "text-teal-500",
      bg: "bg-teal-500/10",
      sub: `${totalAppointments} all time`,
    },
    {
      label: "Active Branches",
      value: totalBranches,
      Icon: GitBranch,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      sub: "5 cities",
    },
    {
      label: "Departments",
      value: DEPARTMENTS.length,
      Icon: Layers,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      sub: "8 specialties",
    },
    {
      label: "Revenue (Completed)",
      value: `৳${(totalRevenue / 1000).toFixed(1)}k`,
      Icon: DollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      trend: +6,
    },
  ];

  const maxAppts = Math.max(...BRANCHES.map((b) => b.appointments_today));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-700 p-7 mb-7 text-white">
        <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full bg-white/5" />
        <div className="absolute bottom-0 right-20 w-28 h-28 rounded-full bg-white/5" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5" />
        <p className="text-xs uppercase tracking-widest text-violet-200 mb-1">
          Admin Control Panel
        </p>
        <h2 className="text-2xl font-bold mb-1">
          Welcome back, {ADMIN.manager_name.split(" ")[0]} 👋
        </h2>
        <p className="text-sm text-indigo-100 max-w-lg">
          Managing {totalDoctors} doctors across {totalBranches} branches ·{" "}
          {todayAppts} appointments scheduled today.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => goTab("doctors")}
            className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 transition border border-white/25 text-white text-xs font-semibold px-3 py-1.5 rounded-xl"
          >
            <Stethoscope className="w-3.5 h-3.5" /> Manage Doctors
          </button>
          <button
            onClick={() => goTab("appointments")}
            className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 transition border border-white/25 text-white text-xs font-semibold px-3 py-1.5 rounded-xl"
          >
            <CalendarDays className="w-3.5 h-3.5" /> View Appointments
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Branch activity */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Branch Activity
            </h3>
            <button
              onClick={() => goTab("branches")}
              className="text-xs text-violet-500 hover:text-violet-600 font-semibold flex items-center gap-1"
            >
              Manage <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-4">
            {BRANCHES.map((b) => (
              <div key={b.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {b.location}
                  </span>
                  <span className="text-xs text-slate-400">
                    {b.appointments_today} appts today
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MiniBar
                    value={b.appointments_today}
                    max={maxAppts}
                    color="bg-violet-500"
                  />
                  <span className="text-[10px] text-slate-400 w-8 text-right shrink-0">
                    {b.doctors} dr
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent appointments */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Recent Appointments
            </h3>
            <button
              onClick={() => goTab("appointments")}
              className="text-xs text-violet-500 hover:text-violet-600 font-semibold flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-0">
            {APPOINTMENTS.slice(0, 5).map((a, i) => (
              <div
                key={a.id}
                className={`flex items-center gap-3 py-2.5 ${i < 4 ? "border-b border-slate-100 dark:border-slate-800" : ""}`}
              >
                <EntityAvatar name={a.patient} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {a.patient}
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                    {a.doctor}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <StatusBadge status={a.status} />
                  <p className="text-[10px] text-slate-400 mt-1">
                    {fmtDate(a.date)}
                  </p>
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
// TAB: DOCTORS
// ─────────────────────────────────────────────────────────────────────────────
function DoctorsTab() {
  const [query, setQuery] = useState("");
  const [branch, setBranch] = useState("All");
  const [dept, setDept] = useState("All");

  const branches = ["All", ...new Set(DOCTORS.map((d) => d.branch))];
  const departments = ["All", ...new Set(DOCTORS.map((d) => d.dept))];

  const filtered = DOCTORS.filter(
    (d) =>
      (branch === "All" || d.branch === branch) &&
      (dept === "All" || d.dept === dept) &&
      (d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.specialty.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SectionHeading action={<AddButton label="Add Doctor" />}>
        Doctors
      </SectionHeading>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search by name or specialty…"
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[11px] text-slate-400 self-center mr-1">
            Branch:
          </span>
          {branches.slice(0, 4).map((b) => (
            <button
              key={b}
              onClick={() => setBranch(b)}
              className={`text-xs font-semibold px-3 py-1 rounded-full border transition ${
                branch === b
                  ? "bg-violet-600 text-white border-transparent"
                  : "bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700 hover:border-slate-400"
              }`}
            >
              {b === "All" ? "All" : b.replace(" Branch", "")}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((d, i) => (
            <motion.div
              key={d.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card hover className="p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-4">
                  <EntityAvatar name={d.name} />
                  <div className="flex-1 min-w-[140px]">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">
                      {d.name}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {d.specialty} · {d.branch}
                    </p>
                  </div>

                  {/* Fee + rating */}
                  <div className="hidden sm:flex flex-col items-end gap-1 min-w-[90px]">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      ৳{d.fee} / visit
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-amber-500">
                      <Star className="w-3 h-3 fill-amber-400" /> {d.rating}
                    </span>
                  </div>

                  <StatusBadge status={d.status} />

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-900/20 text-violet-500 hover:bg-violet-100 dark:hover:bg-violet-900/40 transition">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="sm:hidden flex flex-wrap gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                  <span>৳{d.fee}/visit</span>
                  <span className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {d.rating}
                  </span>
                  <span>Joined {fmtDate(d.joining)}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-sm">
            No doctors match your filters
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: PATIENTS
// ─────────────────────────────────────────────────────────────────────────────
function PatientsTab() {
  const [query, setQuery] = useState("");
  const [branch, setBranch] = useState("All");

  const branches = ["All", ...new Set(PATIENTS.map((p) => p.branch))];

  const filtered = PATIENTS.filter(
    (p) =>
      (branch === "All" || p.branch === branch) &&
      (p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.city.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SectionHeading
        action={
          <p className="text-sm text-slate-400 dark:text-slate-500 font-normal">
            {PATIENTS.length} registered
          </p>
        }
      >
        Patient Registry
      </SectionHeading>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search by name or city…"
      />

      {/* Branch filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {branches.map((b) => (
          <button
            key={b}
            onClick={() => setBranch(b)}
            className={`text-xs font-semibold px-3 py-1 rounded-full border transition ${
              branch === b
                ? "bg-violet-600 text-white border-transparent"
                : "bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700 hover:border-slate-400"
            }`}
          >
            {b === "All" ? "All" : b.replace(" Branch", "")}
          </button>
        ))}
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
                  <EntityAvatar name={p.name} />
                  <div className="flex-1 min-w-[140px]">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">
                      {p.name}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {p.gender} · {p.age} yrs · {p.city}
                    </p>
                  </div>
                  <div className="hidden sm:flex flex-col items-end gap-1 min-w-[110px]">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      {p.branch.replace(" Branch", "")}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {p.visits} visits
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    Since {fmtDate(p.joined)}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-900/20 text-violet-500 hover:bg-violet-100 dark:hover:bg-violet-900/40 transition">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="sm:hidden flex flex-wrap gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                  <span>{p.branch}</span>
                  <span>{p.visits} visits</span>
                  <span>Joined {fmtDate(p.joined)}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-sm">
            No patients match your filters
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: APPOINTMENTS
// ─────────────────────────────────────────────────────────────────────────────
function AppointmentsTab() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = APPOINTMENTS.filter(
    (a) =>
      (filter === "All" || a.status === filter) &&
      (a.patient.toLowerCase().includes(query.toLowerCase()) ||
        a.doctor.toLowerCase().includes(query.toLowerCase()) ||
        a.branch.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SectionHeading>All Appointments</SectionHeading>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search patient, doctor, or branch…"
      />

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
                  <EntityAvatar name={a.patient} />
                  <div className="flex-1 min-w-[130px]">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">
                      {a.patient}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {a.doctor}
                    </p>
                  </div>
                  <div className="hidden sm:flex flex-col gap-1 min-w-[140px]">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <CalendarDays className="w-3.5 h-3.5 text-slate-400" />{" "}
                      {fmtDate(a.date)}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />{" "}
                      {a.branch.replace(" Branch", "")}
                    </div>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
                <div className="sm:hidden flex flex-wrap gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                  <span>{fmtDate(a.date)}</span>
                  <span>{fmtTime(a.time)}</span>
                  <span>{a.branch}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-sm">
            No appointments found
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: BRANCHES
// ─────────────────────────────────────────────────────────────────────────────
function BranchesTab() {
  const maxPatients = Math.max(...BRANCHES.map((b) => b.patients));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Branches */}
      <SectionHeading action={<AddButton label="Add Branch" />}>
        Branches
      </SectionHeading>
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {BRANCHES.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card hover className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-violet-500" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">
                      {b.location}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Branch ID #{b.id}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-900/20 text-violet-500 hover:bg-violet-100 transition">
                    <Pencil className="w-3 h-3" />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-900/20 text-rose-400 hover:bg-rose-100 transition">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Doctors", value: b.doctors },
                  { label: "Patients", value: b.patients },
                  { label: "Today", value: b.appointments_today },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-2.5 text-center"
                  >
                    <p className="text-base font-bold text-slate-900 dark:text-white">
                      {s.value}
                    </p>
                    <p className="text-[10px] text-slate-400">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Patient load bar */}
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Patient load</span>
                  <span>{Math.round((b.patients / maxPatients) * 100)}%</span>
                </div>
                <MiniBar
                  value={b.patients}
                  max={maxPatients}
                  color="bg-gradient-to-r from-violet-500 to-indigo-500"
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Departments */}
      <SectionHeading action={<AddButton label="Add Department" />}>
        Departments
      </SectionHeading>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {DEPARTMENTS.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card hover className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <FlaskConical className="w-4 h-4 text-indigo-500" />
                </div>
                <div className="flex gap-1">
                  <button className="w-6 h-6 flex items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-900/20 text-violet-500 hover:bg-violet-100 transition">
                    <Pencil className="w-3 h-3" />
                  </button>
                  <button className="w-6 h-6 flex items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-900/20 text-rose-400 hover:bg-rose-100 transition">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <p className="font-bold text-slate-800 dark:text-white text-sm mb-1">
                {d.name}
              </p>
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Stethoscope className="w-3 h-3" />
                  {d.doctors} doctors
                </span>
                <span className="flex items-center gap-1">
                  <FlaskConical className="w-3 h-3" />
                  {d.labs} labs
                </span>
              </div>
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
    { label: "Full Name", value: ADMIN.manager_name, Icon: ShieldCheck },
    { label: "Gender", value: ADMIN.gender, Icon: Activity },
    { label: "Date of Birth", value: fmtDate(ADMIN.dob), Icon: CalendarDays },
    { label: "Mobile", value: ADMIN.mobile, Icon: Phone },
    { label: "Email", value: ADMIN.email, Icon: Mail },
    { label: "Branch", value: ADMIN.branch, Icon: Building2 },
    { label: "Joined", value: fmtDate(ADMIN.joining_date), Icon: CalendarDays },
    { label: "Role", value: "Branch Manager", Icon: UserCog },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-700 p-7 mb-6 text-white">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute bottom-0 right-20 w-28 h-28 rounded-full bg-white/5" />
        <div className="flex flex-wrap items-center gap-5">
          <Avatar
            name={ADMIN.manager_name}
            size="xl"
            className="ring-2 ring-white/30"
          />
          <div className="flex-1">
            <p className="text-xl font-bold">{ADMIN.manager_name}</p>
            <p className="text-sm text-indigo-100 mt-0.5">Branch Manager</p>
            <p className="text-xs text-indigo-200 mt-1">{ADMIN.branch}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white text-xs font-semibold px-3 py-1 rounded-full">
                <ShieldCheck className="w-3 h-3" /> Admin Access
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white text-xs font-semibold px-3 py-1 rounded-full">
                <BadgeCheck className="w-3 h-3" /> Verified
              </span>
            </div>
          </div>
          <button className="self-start inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 transition border border-white/30 text-white text-sm font-semibold px-4 py-2 rounded-xl">
            <Pencil className="w-3.5 h-3.5" /> Edit
          </button>
        </div>
      </div>

      {/* System summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          {
            label: "Branches",
            value: BRANCHES.length,
            color: "text-violet-500",
            bg: "bg-violet-500/10",
          },
          {
            label: "Departments",
            value: DEPARTMENTS.length,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
          },
          {
            label: "Doctors",
            value: DOCTORS.length,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
          },
          {
            label: "Patients",
            value: PATIENTS.length,
            color: "text-teal-500",
            bg: "bg-teal-500/10",
          },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 text-center`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Fields */}
      <div className="grid sm:grid-cols-2 gap-4">
        {fields.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card className="p-4 flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                <f.Icon className="w-4 h-4 text-violet-500" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">
                  {f.label}
                </p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {f.value}
                </p>
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
export default function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── URL-based tab state ─────────────────────────────────────────────────────
  const rawTab = searchParams.get("tab");
  const activeTab = TABS.find((t) => t.id === rawTab) ? rawTab : "overview";
  const setTab = (id) => setSearchParams({ tab: id }, { replace: false });

  // ── Dark mode ──────────────────────────────────────────────────────────────
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    setDark(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains("dark")),
    );
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  // ── Mobile sidebar ─────────────────────────────────────────────────────────
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  useEffect(() => {
    const h = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target))
        setSidebarOpen(false);
    };
    if (sidebarOpen) document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [sidebarOpen]);

  // ── Tab content ─────────────────────────────────────────────────────────────
  const CONTENT = {
    overview: <OverviewTab setSearchParams={setSearchParams} />,
    doctors: <DoctorsTab />,
    patients: <PatientsTab />,
    appointments: <AppointmentsTab />,
    branches: <BranchesTab />,
    profile: <ProfileTab />,
  };

  // ── Sidebar ────────────────────────────────────────────────────────────────
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 px-5 py-5 mb-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
          <Stethoscope className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-500">
            Panacea
          </p>
          <p className="text-[9px] tracking-widest text-slate-400 dark:text-slate-500">
            ADMIN PORTAL
          </p>
        </div>
      </Link>

      {/* Admin mini-card */}
      <div className="mx-4 mb-5 p-3.5 rounded-2xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-slate-200 dark:border-slate-700/50 flex items-center gap-3">
        <Avatar name={ADMIN.manager_name} size="sm" />
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
            {ADMIN.manager_name}
          </p>
          <p className="text-[10px] text-slate-400 dark:text-slate-500">
            Branch Manager
          </p>
        </div>
      </div>

      {/* Nav — grouped */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-600 px-3 pt-1 pb-2">
          Main
        </p>
        {TABS.slice(0, 1).map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => {
                setTab(id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? "bg-gradient-to-r from-violet-500/15 to-indigo-500/10 text-violet-600 dark:text-violet-400 border border-violet-200/50 dark:border-violet-800/40"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${isActive ? "text-violet-500" : "text-slate-400"}`}
              />
              {label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500" />
              )}
            </button>
          );
        })}

        <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-600 px-3 pt-4 pb-2">
          Management
        </p>
        {TABS.slice(1, 5).map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => {
                setTab(id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? "bg-gradient-to-r from-violet-500/15 to-indigo-500/10 text-violet-600 dark:text-violet-400 border border-violet-200/50 dark:border-violet-800/40"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${isActive ? "text-violet-500" : "text-slate-400"}`}
              />
              {label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500" />
              )}
            </button>
          );
        })}

        <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-600 px-3 pt-4 pb-2">
          Account
        </p>
        {TABS.slice(5).map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => {
                setTab(id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? "bg-gradient-to-r from-violet-500/15 to-indigo-500/10 text-violet-600 dark:text-violet-400 border border-violet-200/50 dark:border-violet-800/40"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${isActive ? "text-violet-500" : "text-slate-400"}`}
              />
              {label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-5 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1 shrink-0">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
        >
          {dark ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-400" />
          )}
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

      {/* ── MOBILE DRAWER ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              ref={sidebarRef}
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
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
            <span className="text-slate-400 dark:text-slate-500 hidden sm:inline">
              Admin Dashboard
            </span>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">
              /
            </span>
            <span className="font-semibold text-slate-800 dark:text-white capitalize">
              {activeTab}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="hidden sm:flex w-9 h-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              {dark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Admin chip */}
            <div className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <Avatar name={ADMIN.manager_name} size="sm" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 hidden sm:inline">
                {ADMIN.manager_name.split(" ")[0]}
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
                className={`flex flex-col items-center gap-0.5 px-1.5 py-1.5 rounded-xl transition min-w-0 ${
                  isActive
                    ? "text-violet-500"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[9px] font-semibold truncate">
                  {label}
                </span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-violet-500" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
