/**
 * components/doctors/DoctorFilterPanel.jsx
 *
 * Animated collapsible filter panel for department and fee filtering.
 * Slide-in/out handled via framer-motion AnimatePresence.
 *
 * Props:
 *   show         {boolean}             Whether panel is visible
 *   depts        {string[]}            Available department options (includes "All")
 *   deptFilter   {string}              Currently selected dept
 *   onDept       {(d: string)=>void}
 *   feeRanges    {Array<{label:string}>} Fee range options
 *   feeFilter    {string}              Currently selected fee label
 *   onFee        {(f: string)=>void}
 */

import { motion, AnimatePresence } from "framer-motion";

const FilterPill = ({ label, active, onClick }) => (
  <button
    onClick={() => onClick(label)}
    className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition ${
      active
        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent"
        : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400"
    }`}
  >
    {label}
  </button>
);

const DoctorFilterPanel = ({
  show,
  depts,
  deptFilter,
  onDept,
  feeRanges,
  feeFilter,
  onFee,
}) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="overflow-hidden"
      >
        <div className="pt-4 flex flex-col sm:flex-row gap-5 border-t border-slate-100 dark:border-slate-800 mt-3">

          {/* Department */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-2">
              Department
            </p>
            <div className="flex flex-wrap gap-1.5">
              {depts.map((d) => (
                <FilterPill
                  key={d}
                  label={d}
                  active={deptFilter === d}
                  onClick={onDept}
                />
              ))}
            </div>
          </div>

          {/* Fee */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-2">
              Fee
            </p>
            <div className="flex flex-wrap gap-1.5">
              {feeRanges.map((r) => (
                <FilterPill
                  key={r.label}
                  label={r.label}
                  active={feeFilter === r.label}
                  onClick={onFee}
                />
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default DoctorFilterPanel;