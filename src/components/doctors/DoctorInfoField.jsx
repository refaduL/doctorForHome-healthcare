/**
 * components/doctors/DoctorInfoField.jsx
 *
 * A single key–value info row with a leading icon.
 * Used in DoctorDetailsCard and could be reused in dashboard profile views.
 *
 * Props:
 *   Icon   {LucideIcon}     Lucide icon component
 *   label  {string}         Field label (shown in small caps)
 *   value  {string|null}    Field value — renders nothing if falsy
 */

const DoctorInfoField = ({ Icon, label, value }) => {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-slate-100 dark:border-slate-800/80 last:border-0">
      <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 leading-none mb-0.5">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
          {value}
        </p>
      </div>
    </div>
  );
};

export default DoctorInfoField;