/**
 * components/booking/DatePicker.jsx
 *
 * Schedule-aware calendar for appointment date selection.
 * Only days present in `availableDays` (Set of weekday names) are selectable.
 * Days in the past and today are always disabled.
 * Navigates month-by-month across a 60-day window.
 *
 * Props:
 *   availableDays  {Set<string>}          Weekday names the doctor works  e.g. Set(["Sunday","Wednesday"])
 *   value          {string}               Selected date as YYYY-MM-DD or ""
 *   onChange       {(iso: string)=>void}
 *   error          {string|undefined}
 */

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { dayName, nextNDays, DAYS_ORDER, fmtMonthYear } from "../../utils/formatters";

const DatePicker = ({ availableDays, value, onChange, error }) => {
  // Full 60-day window, grouped by "YYYY-MM"
  const byMonth = useMemo(() => {
    const groups = {};
    nextNDays(60).forEach((iso) => {
      const key = iso.slice(0, 7);
      if (!groups[key]) groups[key] = [];
      groups[key].push(iso);
    });
    return groups;
  }, []);

  const months      = Object.keys(byMonth);
  const [monthKey, setMonthKey] = useState(months[0]);
  const monthIdx    = months.indexOf(monthKey);

  // Build a full calendar grid for the visible month (pad with nulls)
  const gridCells = useMemo(() => {
    const firstOfMonth  = new Date(monthKey + "-01T00:00:00");
    const startPad      = firstOfMonth.getDay();                          // 0 = Sunday
    const daysInMonth   = new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth() + 1, 0).getDate();
    const cells         = [];
    for (let i = 0; i < startPad; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(`${monthKey}-${String(d).padStart(2, "0")}`);
    }
    return cells;
  }, [monthKey]);

  // A date is selectable only if it's future AND the doctor works that weekday
  const today = useMemo(() => {
    const d = new Date(); d.setHours(0, 0, 0, 0); return d;
  }, []);

  const isSelectable = (iso) => {
    if (!iso) return false;
    const dt = new Date(iso + "T00:00:00"); dt.setHours(0, 0, 0, 0);
    if (dt <= today) return false;
    if (!availableDays.size) return false;
    return availableDays.has(dayName(iso));
  };

  const borderClass = error
    ? "border-rose-300 dark:border-rose-700"
    : "border-slate-200 dark:border-slate-700";

  return (
    <div className={`rounded-xl border ${borderClass} bg-white dark:bg-slate-900 overflow-hidden`}>

      {/* Month navigation */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setMonthKey(months[monthIdx - 1])}
          disabled={monthIdx === 0}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        </button>

        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
          {fmtMonthYear(monthKey)}
        </span>

        <button
          type="button"
          onClick={() => setMonthKey(months[monthIdx + 1])}
          disabled={monthIdx === months.length - 1}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        </button>
      </div>

      {/* Weekday header row */}
      <div className="grid grid-cols-7 px-3 pt-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-center text-[10px] font-bold uppercase tracking-wider text-slate-400 py-1.5">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-1 px-3 pb-3">
        {gridCells.map((iso, i) => {
          if (!iso) return <div key={`pad-${i}`} />;
          const selectable = isSelectable(iso);
          const selected   = iso === value;
          const day        = new Date(iso + "T00:00:00").getDate();

          return (
            <button
              key={iso}
              type="button"
              disabled={!selectable}
              onClick={() => selectable && onChange(iso)}
              className={`mx-auto w-8 h-8 flex items-center justify-center rounded-xl text-sm font-semibold transition ${
                selected
                  ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30"
                  : selectable
                    ? "text-slate-900 dark:text-white hover:bg-cyan-50 dark:hover:bg-cyan-900/20 hover:text-cyan-600 dark:hover:text-cyan-400"
                    : "text-slate-300 dark:text-slate-700 cursor-not-allowed"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Available-days legend */}
      {availableDays.size > 0 && (
        <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
            Available:
          </span>
          {DAYS_ORDER.filter((d) => availableDays.has(d)).map((d) => (
            <span
              key={d}
              className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 px-2 py-0.5 rounded-full"
            >
              {d.slice(0, 3)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default DatePicker;