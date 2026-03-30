/**
 * components/doctors/DoctorSearchBar.jsx
 *
 * Search input and filter toggle for the DoctorsList page.
 * Tells the parent when search text changes and when the filter
 * panel should open/close — state lives in the parent.
 *
 * Props:
 *   search        {string}            Current search query
 *   onSearch      {(q: string)=>void}
 *   showFilter    {boolean}           Whether filter panel is open
 *   onToggleFilter {()=>void}
 *   hasActiveFilter {boolean}         True when any filter is non-default (shows dot)
 */

import { Search, SlidersHorizontal, X } from "lucide-react";

const DoctorSearchBar = ({
  search,
  onSearch,
  showFilter,
  onToggleFilter,
  hasActiveFilter,
}) => (
  <div className="flex gap-2">
    {/* Search input */}
    <div className="relative flex-1">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        placeholder="Search by name, specialty or department…"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 transition"
      />
      {search && (
        <button
          onClick={() => onSearch("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>

    {/* Filter toggle */}
    <button
      onClick={onToggleFilter}
      className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition shrink-0 ${
        showFilter || hasActiveFilter
          ? "bg-cyan-500 text-white border-transparent"
          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
      }`}
    >
      <SlidersHorizontal className="w-4 h-4" />
      <span className="hidden sm:inline">Filter</span>
      {hasActiveFilter && (
        <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
      )}
    </button>
  </div>
);

export default DoctorSearchBar;