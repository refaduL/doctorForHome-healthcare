/**
 * utils/specConfig.js
 *
 * Single source of truth for specialty → colour mappings.
 * Returns a plain object with Tailwind class strings — no React dependency.
 *
 * Properties returned:
 *   bg    — light tinted background    e.g. "bg-rose-500/10"
 *   text  — matching text colour       e.g. "text-rose-500"
 *   bar   — solid bar / dot colour     e.g. "bg-rose-500"
 *   grad  — gradient from/to classes   e.g. "from-rose-500/15 to-rose-500/5"
 *
 * Consumers (current):
 *   pages/DoctorsList.jsx
 *   pages/DoctorDetail.jsx
 *   pages/Booking.jsx
 *   components/booking/DoctorSelect.jsx
 *   components/booking/BookingSummary.jsx
 *   components/shared/DoctorAvatar.jsx
 */

/**
 * @typedef {Object} SpecColors
 * @property {string} bg    Tailwind bg class (tinted)
 * @property {string} text  Tailwind text class
 * @property {string} bar   Tailwind bg class (solid, for bars / dots)
 * @property {string} grad  Tailwind gradient from/to classes
 */

/** @type {Array<{ match: string, colors: SpecColors }>} */
const SPEC_MAP = [
  { match: "cardio",  colors: { bg: "bg-rose-500/10",    text: "text-rose-500",    bar: "bg-rose-500",    grad: "from-rose-500/15 to-rose-500/5"    } },
  { match: "neuro",   colors: { bg: "bg-violet-500/10",  text: "text-violet-500",  bar: "bg-violet-500",  grad: "from-violet-500/15 to-violet-500/5" } },
  { match: "ortho",   colors: { bg: "bg-amber-500/10",   text: "text-amber-500",   bar: "bg-amber-500",   grad: "from-amber-500/15 to-amber-500/5"   } },
  { match: "derm",    colors: { bg: "bg-pink-500/10",    text: "text-pink-500",    bar: "bg-pink-500",    grad: "from-pink-500/15 to-pink-500/5"     } },
  { match: "ophthal", colors: { bg: "bg-sky-500/10",     text: "text-sky-500",     bar: "bg-sky-500",     grad: "from-sky-500/15 to-sky-500/5"       } },
  { match: "pediatr", colors: { bg: "bg-emerald-500/10", text: "text-emerald-500", bar: "bg-emerald-500", grad: "from-emerald-500/15 to-emerald-500/5"} },
  { match: "onco",    colors: { bg: "bg-orange-500/10",  text: "text-orange-500",  bar: "bg-orange-500",  grad: "from-orange-500/15 to-orange-500/5"  } },
  { match: "radio",   colors: { bg: "bg-teal-500/10",    text: "text-teal-500",    bar: "bg-teal-500",    grad: "from-teal-500/15 to-teal-500/5"      } },
];

/** Fallback when specialty doesn't match any known pattern */
const DEFAULT_COLORS = {
  bg:   "bg-cyan-500/10",
  text: "text-cyan-500",
  bar:  "bg-cyan-500",
  grad: "from-cyan-500/15 to-cyan-500/5",
};

/**
 * Return colour classes for a given specialty string.
 * Matching is case-insensitive and substring-based.
 *
 * @param {string} [specialty=""]
 * @returns {SpecColors}
 *
 * @example
 * const { bg, text } = specColor("Cardiologist");
 * // { bg: "bg-rose-500/10", text: "text-rose-500", bar: "bg-rose-500", grad: "..." }
 */
export const specColor = (specialty = "") => {
  const s = specialty.toLowerCase();
  return SPEC_MAP.find((entry) => s.includes(entry.match))?.colors ?? DEFAULT_COLORS;
};