export default function SegmentedThemeToggle({ darkMode, toggleTheme }) {
  return (
    <div
      role="group"
      aria-label="Theme switcher"
      className="w-full grid grid-cols-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 p-1 shadow-sm"
    >
      <button
        onClick={!darkMode ? undefined : toggleTheme}
        aria-pressed={!darkMode}
        className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
          !darkMode
            ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
        }`}
      >
        <span>☀️</span>
        <span>Light</span>
      </button>

      <button
        onClick={darkMode ? undefined : toggleTheme}
        aria-pressed={darkMode}
        className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
          darkMode
            ? 'bg-slate-800 text-white shadow-sm dark:bg-slate-700'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
        }`}
      >
        <span>🌙</span>
        <span>Dark</span>
      </button>
    </div>
  );
}
