/**
 * components/booking/BookingSummary.jsx
 *
 * The dark "receipt preview" card displayed alongside the booking form.
 * Updates reactively as the user fills each step.
 *
 * Props:
 *   doctor       {object|null}   Full doctor record or null
 *   date         {string}        Selected YYYY-MM-DD or ""
 *   time         {string}        HH:MM:SS or ""
 *   serialNo     {number}
 *   patientId    {number}        Hardcoded until auth
 */

import { CalendarDays, Clock, Hash, MapPin, User, DollarSign, Info, Stethoscope } from "lucide-react";

import DoctorAvatar          from "../shared/DoctorAvatar";
import { fmtFee, fmtTime, fmtDateLong } from "../../utils/formatters";

// Internal row component — only renders when value is present
function SummaryRow({ icon: Icon, label, value }) {
  if (!value || value === "—") return null;
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-white/10 last:border-0">
      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5 text-white/80" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-widest text-white/50">{label}</p>
        <p className="text-sm font-semibold text-white/90 truncate">{value}</p>
      </div>
    </div>
  );
}

const BookingSummary = ({ doctor, date, time, serialNo, patientId }) => {
  const branch = (doctor?.branch?.location_details || doctor?.branch || "").replace(" Branch", "");

  return (
    <div>
      {/* Dark card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 dark:from-slate-900 dark:via-slate-950 dark:to-black rounded-2xl p-6 text-white">

        {/* Decorative circles */}
        <div className="absolute -top-8  -right-8 w-32 h-32 rounded-full bg-cyan-500/10"   />
        <div className="absolute  bottom-4  right-4 w-16 h-16 rounded-full bg-purple-500/10" />
        <div className="absolute  top-1/2  -left-4 w-12 h-12 rounded-full bg-blue-500/10"   />

        <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4">
          Booking Summary
        </p>

        {/* Doctor block */}
        {doctor ? (
          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/10">
            <DoctorAvatar
              name={doctor.doctor_name}
              specialty={doctor.specialization}
              image={doctor.image}
              size="md"
            />
            <div className="min-w-0">
              <p className="font-black text-white leading-tight truncate">{doctor.doctor_name}</p>
              <p className="text-xs text-white/60 mt-0.5 truncate">{doctor.specialization}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/10">
            <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
              <Stethoscope className="w-5 h-5 text-white/30" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white/30">No doctor selected</p>
              <p className="text-xs text-white/20 mt-0.5">Select a doctor to preview</p>
            </div>
          </div>
        )}

        {/* Detail rows */}
        <div>
          <SummaryRow icon={CalendarDays} label="Date"    value={date ? fmtDateLong(date) : undefined} />
          <SummaryRow icon={Clock}        label="Time"    value={time ? fmtTime(time)     : undefined} />
          <SummaryRow icon={Hash}         label="Serial"  value={date && time ? `#${serialNo}` : undefined} />
          <SummaryRow icon={MapPin}       label="Branch"  value={branch || undefined} />
          <SummaryRow icon={User}         label="Patient" value={`Patient #${patientId}`} />
        </div>

        {/* Fee */}
        {doctor && (
          <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-white/50" />
              <span className="text-sm text-white/60 font-semibold">Consultation Fee</span>
            </div>
            <span className="text-xl font-black text-white">{fmtFee(doctor.fee)}</span>
          </div>
        )}

        {/* Pending status pill */}
        <div className="mt-4 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
          <p className="text-xs text-white/50 font-semibold">
            Booking status: <span className="text-amber-400">Pending</span>
          </p>
        </div>
      </div>

      {/* Info note */}
      <div className="mt-3 flex items-start gap-2 px-1">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
          Appointment time is automatically set from the doctor's schedule.
          Serial number is assigned in booking order for that day.
        </p>
      </div>
    </div>
  );
};

export default BookingSummary;