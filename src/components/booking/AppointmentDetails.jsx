/**
 * components/booking/AppointmentDetails.jsx
 *
 * Step 3 of the booking form — shows auto-assigned read-only fields:
 *   - Consultation time (from the doctor's schedule)
 *   - Serial number     (count of existing bookings for that doctor+date + 1)
 *   - Low-slot warning  (when remaining slots ≤ 3)
 *
 * Props:
 *   time       {string}   HH:MM:SS e.g. "14:30:00"
 *   serialNo   {number}   Assigned serial position
 *   totalSlots {number}   Doctor's slot capacity for this day
 */

import { Clock, Hash, AlertCircle } from "lucide-react";
import { fmtTime } from "../../utils/formatters";

const AppointmentDetails = ({ time, serialNo, totalSlots }) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">

        {/* Consultation time */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-cyan-500" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-0.5">
              Consultation Time
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {fmtTime(time)}
            </p>
          </div>
        </div>

        {/* Serial number */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
          <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
            <Hash className="w-4 h-4 text-violet-500" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-0.5">
              Your Serial No.
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              ##
            </p>
          </div>
        </div>
      </div>

      {/* Low-slot warning */}
      {totalSlots > 0 && totalSlots <= 3 && (
        <div className="mt-3 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
            Only {totalSlots} slot{totalSlots !== 1 ? "s" : ""} remaining on this day. Book soon.
          </p>
        </div>
      )}
    </div>
  );
};

export default AppointmentDetails;