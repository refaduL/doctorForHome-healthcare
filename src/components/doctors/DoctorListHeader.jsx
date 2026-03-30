/**
 * components/doctors/DoctorListHeader.jsx
 *
 * Page heading, subtitle, and live count chips for the DoctorsList page.
 * Animated fade-in via framer-motion.
 *
 * Props:
 *   total       {number}   Total doctors loaded
 *   availNow    {number}   Doctors available today
 *   loading     {boolean}  Hides chips while data is loading
 */

import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";

const DoctorListHeader = ({ total, availNow, loading }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    className="mb-8"
  >
    {/* Eyebrow */}
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

    {/* Live count chips */}
    {!loading && (
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-3 py-1">
          {total} Doctors
        </span>
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 rounded-full px-3 py-1 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {availNow} Available Today
        </span>
      </div>
    )}
  </motion.div>
);

export default DoctorListHeader;