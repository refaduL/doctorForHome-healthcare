/**
 * components/doctors/DoctorRow.jsx
 *
 * A single row in the doctors list page.
 * Two completely separate layouts inside one card:
 *   - Mobile (< sm): stacked — avatar+name top, meta+buttons bottom
 *   - Desktop (sm+): horizontal row — avatar | info | branch | fee | avail | actions
 *
 * Props:
 *   doctor  {object}   Doctor record from useDoctors()
 *   index   {number}   Position in list, used for staggered animation delay
 */

import { Link }           from "react-router-dom";
import { motion }         from "framer-motion";
import {
  MapPin, Stethoscope, GraduationCap, CalendarCheck, ChevronRight,
} from "lucide-react";

import DoctorAvatar  from "../shared/DoctorAvatar";
import { fmtFee, TODAY_NAME } from "../../utils/formatters";
import { specColor } from "../../utils/specConfig";

// ─── schedule helpers (local — only DoctorRow needs these) ────────────────────

const isAvailableToday = (schedules = []) =>
  schedules.some((s) => s.days?.toLowerCase() === TODAY_NAME.toLowerCase());

const slotsToday = (schedules = []) =>
  schedules
    .filter((s) => s.days?.toLowerCase() === TODAY_NAME.toLowerCase())
    .reduce((n, s) => n + (s.slots || 0), 0);

// ─── Availability badge (shared between mobile and desktop) ───────────────────

const AvailBadge = ({ avail, slots, compact = false }) => (
  <span className={`inline-flex items-center gap-1.5 font-bold rounded-full border ${
    compact ? "text-[10px] px-2 py-1" : "text-[11px] px-2.5 py-1.5"
  } ${
    avail
      ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40"
      : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700"
  }`}>
    <span className={`rounded-full shrink-0 ${compact ? "w-1.5 h-1.5" : "w-1.5 h-1.5"} ${
      avail ? "bg-emerald-500 animate-pulse" : "bg-slate-300 dark:bg-slate-600"
    }`} />
    {avail ? `${slots} slots` : compact ? "Off" : "Off today"}
  </span>
);

// ─── Main component ───────────────────────────────────────────────────────────

const DoctorRow = ({ doctor, index }) => {
  const c      = specColor(doctor.specialization);
  const avail  = isAvailableToday(doctor.schedules);
  const slots  = slotsToday(doctor.schedules);
  const branch = doctor.branch?.location_details || doctor.branch || "—";
  const dept   = doctor.dept?.dept_name          || doctor.dept   || "—";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.22, delay: index * 0.045 }}
      layout
    >
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200">

        {/* Specialty accent bar — left edge */}
        <div className={`absolute inset-y-0 left-0 w-1 ${c.bar} opacity-60 rounded-l-2xl`} />

        {/* ── MOBILE (< sm) ────────────────────────────────────────────────── */}
        <div className="sm:hidden pl-4 pr-4 pt-4 pb-4">
          <div className="flex items-center gap-3">
            <DoctorAvatar
              name={doctor.doctor_name}
              specialty={doctor.specialization}
              image={doctor.image}
              size="sm"
            />

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate leading-tight">
                {doctor.doctor_name}
              </h3>
              <span className={`inline-flex items-center gap-1 mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>
                <Stethoscope className="w-2.5 h-2.5 shrink-0" />
                {doctor.specialization}
              </span>
            </div>

            {/* Compact availability — top-right corner */}
            <AvailBadge avail={avail} slots={slots} compact />
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              {branch.replace(" Branch", "")}
            </span>
            <span>{dept}</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {fmtFee(doctor.fee)}
            </span>
          </div>

          {/* Actions — always full-width, always inside the card */}
          <div className="flex gap-2 mt-3">
            <Link
              to={`/doctors/${doctor.doctor_id}`}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              View Profile
            </Link>
            <Link
              to="/booking"
              state={{ doctorId: doctor.doctor_id, doctorName: doctor.doctor_name }}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold text-center hover:opacity-90 transition"
            >
              Book Now
            </Link>
          </div>
        </div>

        {/* ── DESKTOP (sm+) ────────────────────────────────────────────────── */}
        <div className="hidden sm:flex items-center gap-4 pl-5 pr-4 py-4">

          <DoctorAvatar
            name={doctor.doctor_name}
            specialty={doctor.specialization}
            image={doctor.image}
            size="md"
          />

          {/* Name + specialty + quals — grows to fill remaining space */}
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

          {/* Branch + dept — hidden below md to avoid squeeze */}
          <div className="hidden md:flex flex-col gap-0.5 shrink-0 w-32">
            <span className="text-[10px] uppercase tracking-widest text-slate-400">Branch</span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              {branch.replace(" Branch", "")}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{dept}</span>
          </div>

          {/* Fee */}
          <div className="shrink-0 text-right hidden sm:block">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 block">Fee</span>
            <span className="text-base font-bold text-slate-900 dark:text-white">
              {fmtFee(doctor.fee)}
            </span>
          </div>

          {/* Availability */}
          <div className="shrink-0">
            <AvailBadge avail={avail} slots={slots} />
          </div>

          {/* Actions — always shrink-0, always last in the row */}
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
};

export default DoctorRow;