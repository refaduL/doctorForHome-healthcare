/**
 * components/doctors/DoctorEmptyState.jsx
 *
 * Zero-results state shown when no doctors match the current
 * search/filter combination on the DoctorsList page.
 *
 * Props:
 *   onClear  {()=>void}  Resets all filters and search
 */

import { motion } from "framer-motion";
import { Search } from "lucide-react";

const DoctorEmptyState = ({ onClear }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-20"
  >
    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3">
      <Search className="w-6 h-6 text-slate-400" />
    </div>
    <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
      No doctors found
    </p>
    <p className="text-sm text-slate-400 mt-1">
      Try adjusting your search or filters
    </p>
    <button
      onClick={onClear}
      className="mt-4 text-sm font-semibold text-cyan-500 hover:text-cyan-600 underline underline-offset-2 transition"
    >
      Clear all filters
    </button>
  </motion.div>
);

export default DoctorEmptyState;