/**
 * components/booking/DoctorSelect.jsx
 *
 * Custom doctor-selection dropdown for the booking form.
 * Shows avatar, name, specialty, branch, and fee per option.
 * Includes inline search so users can find a doctor quickly.
 *
 * Props:
 *   doctors   {Array}             Full doctor list from useDoctors()
 *   value     {string}            Selected doctor_id (as string) or ""
 *   onChange  {(id: string)=>void}
 *   error     {string|undefined}  Validation error message
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, ChevronDown, CheckCircle2 } from "lucide-react";

import DoctorAvatar from "../shared/DoctorAvatar";
import { fmtFee }   from "../../utils/formatters";

const DoctorSelect = ({ doctors, value, onChange, error }) => {
  const [open, setOpen] = useState(false);
  const [q,    setQ]    = useState("");

  const selected = doctors.find((d) => String(d.doctor_id) === String(value)) ?? null;

  const filtered = doctors.filter((d) =>
    `${d.doctor_name} ${d.specialization}`.toLowerCase().includes(q.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (!e.target.closest("[data-doctor-select]")) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const triggerBase =
    "w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition";
  const triggerIdle =
    "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600";
  const triggerError =
    "border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-900/10";
  const triggerOpen =
    "ring-2 ring-cyan-500/30 border-cyan-400 dark:border-cyan-500";

  return (
    <div className="relative" data-doctor-select>

      {/* ── Trigger button ────────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`${triggerBase} ${error ? triggerError : triggerIdle} ${open ? triggerOpen : ""}`}
      >
        {selected ? (
          <>
            <DoctorAvatar
              name={selected.doctor_name}
              specialty={selected.specialization}
              image={selected.image}
              size="sm"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {selected.doctor_name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {selected.specialization}
              </p>
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 shrink-0">
              {fmtFee(selected.fee)}
            </span>
          </>
        ) : (
          <>
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
              <Stethoscope className="w-4 h-4 text-slate-400" />
            </div>
            <span className="flex-1 text-sm text-slate-400">Select a doctor…</span>
          </>
        )}
        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* ── Dropdown panel ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute z-30 top-full mt-2 left-0 right-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-slate-950/60 overflow-hidden"
          >
            {/* Search */}
            <div className="p-2 border-b border-slate-100 dark:border-slate-800">
              <input
                type="text"
                placeholder="Search doctors…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                autoFocus
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            {/* Options list */}
            <div className="max-h-64 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-6">No doctors found</p>
              ) : (
                filtered.map((d) => {
                  const isSelected = String(d.doctor_id) === String(value);
                  const branch     = d.branch?.location_details || d.branch || "";
                  return (
                    <button
                      key={d.doctor_id}
                      type="button"
                      onClick={() => { onChange(String(d.doctor_id)); setOpen(false); setQ(""); }}
                      className={`w-full flex items-center gap-3 px-3 py-3 text-left transition border-b border-slate-50 dark:border-slate-800/50 last:border-0 ${
                        isSelected
                          ? "bg-cyan-50 dark:bg-cyan-900/20"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <DoctorAvatar
                        name={d.doctor_name}
                        specialty={d.specialization}
                        image={d.image}
                        size="sm"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {d.doctor_name}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {d.specialization}
                          {branch ? ` · ${branch.replace(" Branch", "")}` : ""}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                          {fmtFee(d.fee)}
                        </p>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-cyan-500 ml-auto mt-0.5" />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoctorSelect;