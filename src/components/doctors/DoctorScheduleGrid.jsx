/**
 * components/doctors/DoctorScheduleGrid.jsx
 *
 * Renders a doctor's weekly schedule as a responsive 2-column grid.
 * Today's slot is highlighted in emerald with a "TODAY" badge.
 * Days are sorted by canonical week order (Sun → Sat).
 *
 * Props:
 *   schedules  {Array}  Doctor's schedules array from API
 *                       Each item: { days, sc_time, slots }
 */

import { CalendarDays, Clock } from "lucide-react";
import { fmtTime, TODAY_NAME, DAYS_ORDER } from "../../utils/formatters";

const DoctorScheduleGrid = ({ schedules = [] }) => {
  if (!schedules.length) {
    return (
      <p className="text-sm text-slate-400 dark:text-slate-500 italic">
        No schedule available.
      </p>
    );
  }

  const sorted = [...schedules].sort(
    (a, b) => DAYS_ORDER.indexOf(a.days) - DAYS_ORDER.indexOf(b.days)
  );

  return (
    <div className="grid sm:grid-cols-2 gap-2">
      {sorted.map((s, i) => {
        const isToday = s.days?.toLowerCase() === TODAY_NAME.toLowerCase();
        return (
          <div
            key={i}
            className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border ${
              isToday
                ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/40"
                : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50"
            }`}
          >
            {/* Day icon */}
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              isToday ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"
            }`}>
              <CalendarDays className={`w-4 h-4 ${
                isToday ? "text-white" : "text-slate-500 dark:text-slate-400"
              }`} />
            </div>

            {/* Day name + time + slots */}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={`text-sm font-bold ${
                  isToday
                    ? "text-emerald-700 dark:text-emerald-300"
                    : "text-slate-700 dark:text-slate-300"
                }`}>
                  {s.days}
                </span>
                {isToday && (
                  <span className="text-[9px] font-bold bg-emerald-500 text-white px-1.5 py-0.5 rounded-full tracking-wide">
                    TODAY
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 shrink-0" />
                {fmtTime(s.sc_time)}
                <span className="text-slate-300 dark:text-slate-600 mx-0.5">·</span>
                {s.slots} slots
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DoctorScheduleGrid;