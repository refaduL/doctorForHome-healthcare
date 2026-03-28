import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, Stethoscope, GraduationCap,
  CalendarCheck, ChevronRight, SlidersHorizontal, X,
} from "lucide-react";

import { useDoctors }   from "../hooks/useDoctors";
import LoadWrapper      from "../components/shared/LoadWrapper";
import { showError }    from "../utils/toast";

// ─── helpers ──────────────────────────────────────────────────────────────────

const TODAY = new Date().toLocaleDateString("en-US", { weekday: "long" });

const availableToday = (schedules = []) =>
  schedules.some((s) => s.days?.toLowerCase() === TODAY.toLowerCase());

const slotsToday = (schedules = []) =>
  schedules
    .filter((s) => s.days?.toLowerCase() === TODAY.toLowerCase())
    .reduce((n, s) => n + (s.doc_sc?.slots || 0), 0);

const specColor = (specialty = "") => {
  const s = specialty.toLowerCase();
  if (s.includes("cardio"))  return { bg: "bg-rose-500/10",    text: "text-rose-500",    bar: "bg-rose-500"    };
  if (s.includes("neuro"))   return { bg: "bg-violet-500/10",  text: "text-violet-500",  bar: "bg-violet-500"  };
  if (s.includes("ortho"))   return { bg: "bg-amber-500/10",   text: "text-amber-500",   bar: "bg-amber-500"   };
  if (s.includes("derm"))    return { bg: "bg-pink-500/10",    text: "text-pink-500",    bar: "bg-pink-500"    };
  if (s.includes("ophthal")) return { bg: "bg-sky-500/10",     text: "text-sky-500",     bar: "bg-sky-500"     };
  if (s.includes("pediatr")) return { bg: "bg-emerald-500/10", text: "text-emerald-500", bar: "bg-emerald-500" };
  if (s.includes("onco"))    return { bg: "bg-orange-500/10",  text: "text-orange-500",  bar: "bg-orange-500"  };
  if (s.includes("radio"))   return { bg: "bg-teal-500/10",    text: "text-teal-500",    bar: "bg-teal-500"    };
  return                            { bg: "bg-cyan-500/10",    text: "text-cyan-500",    bar: "bg-cyan-500"    };
};

const initials = (name = "") =>
  name.replace(/^Dr\.?\s*/i, "").split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

const fmtFee = (fee) => (fee ? `৳${Number(fee).toLocaleString()}` : "—");

// DoctorRow 

function DoctorRow({ doctor, index }) {
  const c        = specColor(doctor.specialization);
  const avail    = availableToday(doctor.schedules);
  const slots    = slotsToday(doctor.schedules);
  const dept     = doctor.dept?.dept_name          || "—";
  const branch   = doctor.branch?.location_details || "—";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.22, delay: index * 0.045 }}
      layout
    >
      {/* Outer card — left accent bar via border-l */}
      <div className={`relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200`}>

        {/* Specialty accent — thin left bar */}
        {/* <div className={`absolute inset-y-0 left-0 w-1 ${c.bar} opacity-60 rounded-l-2xl`} /> */}

        {/* MOBILE  (below sm) */}
        <div className="sm:hidden pl-4 pr-4 pt-4 pb-4">

          {/* Top: avatar + name block */}
          <div className="flex items-center gap-3">
            {doctor.image ? (
              <img src={doctor.image} alt={doctor.doctor_name}
                className="w-12 h-12 rounded-xl object-cover shrink-0" />
            ) : (
              <div className={`w-12 h-12 rounded-xl ${c.bg} ${c.text} flex items-center justify-center font-bold text-sm shrink-0`}>
                {initials(doctor.doctor_name)}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate leading-tight">
                {doctor.doctor_name}
              </h3>
              <span className={`inline-flex items-center gap-1 mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>
                <Stethoscope className="w-2.5 h-2.5 shrink-0" />
                {doctor.specialization}
              </span>
            </div>

            {/* Availability pill — top-right */}
            <span className={`shrink-0 flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border ${
              avail
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40"
                : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${avail ? "bg-emerald-500 animate-pulse" : "bg-slate-300 dark:bg-slate-600"}`} />
              {avail ? `${slots} slots` : "Off today"}
            </span>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              {branch.replace(" Branch", "")}
            </span>
            {/* <span>{dept}</span> */}
            <span className="font-semibold text-slate-700 dark:text-slate-300">{fmtFee(doctor.fee)}</span>
          </div>

          {/* Buttons — always full-width, always inside card */}
          <div className="flex gap-2 mt-3">
            <Link to={`/doctors/${doctor.doctor_id}`}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition">
              View Profile
            </Link>
            <Link to="/booking" state={{ doctorId: doctor.doctor_id, doctorName: doctor.doctor_name }}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold text-center hover:opacity-90 transition">
              Book Now
            </Link>
          </div>
        </div>

        {/* DESKTOP (sm and up) */}
        <div className="hidden sm:flex items-center gap-4 pl-5 pr-4 py-4">

          {/* Avatar */}
          {doctor.image ? (
            <img src={doctor.image} alt={doctor.doctor_name}
              className="w-14 h-14 rounded-xl object-cover shrink-0" />
          ) : (
            <div className={`w-14 h-14 rounded-xl ${c.bg} ${c.text} flex items-center justify-center font-bold text-base shrink-0`}>
              {initials(doctor.doctor_name)}
            </div>
          )}

          {/* Name + specialty + quals — takes all leftover space */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-bold text-slate-900 dark:text-white leading-tight truncate">
              {doctor.doctor_name}
            </h3>
            <span className={`inline-flex items-center gap-1 mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>
              <Stethoscope className="w-2.5 h-2.5 shrink-0" />
              {doctor.specialization}
            </span>
            {doctor.qualifications && (
              <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 truncate">
                <GraduationCap className="w-3 h-3 shrink-0" />
                {doctor.qualifications}
              </p>
            )}
          </div>

          {/* Branch + dept  */}
          <div className="hidden md:flex flex-col items-center justify-center gap-1 shrink-0 w-32 text-center">
            <span className="text-[10px] uppercase tracking-widest text-slate-400">Branch</span>

            <div className="flex items-center justify-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span className="truncate">{branch}</span>
            </div>
          </div>

          {/* Fee */}
          <div className="hidden sm:flex flex-col items-center justify-center shrink-0 w-24 text-center">
            <span className="text-[10px] uppercase tracking-widest text-slate-400">Fee</span>
            <span className="text-base font-bold text-slate-900 dark:text-white">
              {fmtFee(doctor.fee)}
            </span>
          </div>

          {/* Availability */}
          <div className="shrink-0">
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1.5 rounded-full border ${
              avail
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40"
                : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${avail ? "bg-emerald-500 animate-pulse" : "bg-slate-300 dark:bg-slate-600"}`} />
              {avail ? `${slots} slots` : "Off today"}
            </span>
          </div>

          {/* Action buttons — always shrink-0, always last */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to={`/doctors/${doctor.doctor_id}`}
              className="flex items-center gap-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition whitespace-nowrap"
            >
              Profile <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/booking"
              state={{ doctorId: doctor.doctor_id, doctorName: doctor.doctor_name }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold hover:opacity-90 transition whitespace-nowrap"
            >
              <CalendarCheck className="w-3.5 h-3.5 shrink-0" /> Book Now
            </Link>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

const DoctorsList = () => {
  const [search,     setSearch]     = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [feeFilter,  setFeeFilter]  = useState("All");
  const [showFilter, setShowFilter] = useState(false);

  const { doctors, loading, error } = useDoctors();
  if (error) showError(error);

  const depts = ["All", ...new Set(
    doctors.map((d) => d.dept?.dept_name || d.dept).filter(Boolean)
  )];

  const FEE_RANGES = [
    { label: "All",         test: ()  => true                     },
    { label: "Under ৳800",  test: (f) => f < 800                  },
    { label: "৳800 – 1200", test: (f) => f >= 800 && f <= 1200    },
    { label: "Above ৳1200", test: (f) => f > 1200                 },
  ];

  const filtered = doctors.filter((d) => {
    const q    = search.toLowerCase();
    const name = `${d.doctor_name} ${d.specialization} ${d.dept?.dept_name || ""}`.toLowerCase();
    const feeOk = (FEE_RANGES.find((r) => r.label === feeFilter) ?? FEE_RANGES[0]).test(d.fee);
    return name.includes(q)
      && (deptFilter === "All" || (d.dept?.dept_name || d.dept) === deptFilter)
      && feeOk;
  });

  const availNow  = doctors.filter((d) => availableToday(d.schedules)).length;
  const hasFilter = search || deptFilter !== "All" || feeFilter !== "All";

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* ── HEADER ─────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }} className="mb-8"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200/50 dark:border-cyan-800/40 mb-3">
            <Stethoscope className="w-3 h-3" /> Our Medical Team
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Find Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">
              Doctor
            </span>
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Browse verified specialists and book appointments instantly.
          </p>

          {!loading && (
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-3 py-1">
                {doctors.length} Doctors
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 rounded-full px-3 py-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {availNow} Available Today
              </span>
            </div>
          )}
        </motion.div>

        {/* ── SEARCH + FILTER ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.08 }} className="mb-5"
        >
          <div className="flex gap-2">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name, specialty or department…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 transition"
              />
              {search && (
                <button onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 hover:bg-slate-300 dark:hover:bg-slate-600 transition">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilter((v) => !v)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition shrink-0 ${
                showFilter || deptFilter !== "All" || feeFilter !== "All"
                  ? "bg-cyan-500 text-white border-transparent"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
              {(deptFilter !== "All" || feeFilter !== "All") && (
                <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
              )}
            </button>
          </div>

          {/* Filter panel */}
          <AnimatePresence>
            {showFilter && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18 }}
                className="overflow-hidden"
              >
                <div className="pt-4 flex flex-col sm:flex-row gap-5 border-t border-slate-100 dark:border-slate-800 mt-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-2">Department</p>
                    <div className="flex flex-wrap gap-1.5">
                      {depts.map((d) => (
                        <button key={d} onClick={() => setDeptFilter(d)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition ${
                            deptFilter === d
                              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent"
                              : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400"
                          }`}>{d}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-2">Fee</p>
                    <div className="flex flex-wrap gap-1.5">
                      {FEE_RANGES.map((r) => (
                        <button key={r.label} onClick={() => setFeeFilter(r.label)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition ${
                            feeFilter === r.label
                              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent"
                              : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400"
                          }`}>{r.label}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── RESULT META ───────────────────────────────────────────────────── */}
        {!loading && filtered.length > 0 && (
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              <span className="font-semibold text-slate-600 dark:text-slate-300">{filtered.length}</span>
              {" "}doctor{filtered.length !== 1 ? "s" : ""}{hasFilter ? " · filtered" : ""}
            </p>
            {hasFilter && (
              <button
                onClick={() => { setSearch(""); setDeptFilter("All"); setFeeFilter("All"); }}
                className="text-xs font-semibold text-cyan-500 hover:text-cyan-600 transition"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* ── LIST ──────────────────────────────────────────────────────────── */}
        <LoadWrapper loading={loading}>
          <>
            <AnimatePresence mode="popLayout">
              <div className="flex flex-col gap-3">
                {filtered.map((doc, i) => (
                  <DoctorRow key={doc.doctor_id} doctor={doc} index={i} />
                ))}
              </div>
            </AnimatePresence>

            {!loading && filtered.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-base font-semibold text-slate-700 dark:text-slate-300">No doctors found</p>
                <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filters</p>
                <button
                  onClick={() => { setSearch(""); setDeptFilter("All"); setFeeFilter("All"); }}
                  className="mt-4 text-sm font-semibold text-cyan-500 hover:text-cyan-600 underline underline-offset-2 transition"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </>
        </LoadWrapper>

      </div>
    </div>
  );
};

export default DoctorsList;