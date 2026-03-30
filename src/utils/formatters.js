/**
 * utils/formatters.js
 *
 * Pure formatting helpers shared across pages and components.
 * No React, no side effects — safe to import anywhere.
 *
 * Consumers (current):
 *   pages/DoctorsList.jsx
 *   pages/DoctorDetail.jsx
 *   pages/Booking.jsx
 *   pages/dashboard/PatientDashboard.jsx
 *   pages/dashboard/DoctorDashboard.jsx
 *   pages/dashboard/AdminDashboard.jsx
 *   components/booking/*
 */

// ─── Currency ──────────────────────────────────────────────────────────────────

/**
 * Format a consultation fee in BDT.
 * @param {number|string|null} fee
 * @returns {string}  e.g. "৳1,200" or "—"
 */
export const fmtFee = (fee) =>
  fee != null && fee !== "" ? `৳${Number(fee).toLocaleString()}` : "—";

// ─── Time ─────────────────────────────────────────────────────────────────────

/**
 * Format a HH:MM:SS time string to 12-hour display.
 * @param {string|null} t  e.g. "14:30:00"
 * @returns {string}       e.g. "2:30 PM" or "—"
 */
export const fmtTime = (t) => {
  if (!t) return "—";
  const [h, m] = t.split(":");
  const d = new Date();
  d.setHours(+h, +m, 0, 0);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
};

// ─── Date ─────────────────────────────────────────────────────────────────────

/**
 * Short date: "18 Mar 2025"
 * Used in tables, lists, dashboard rows.
 * @param {string|Date|null} s
 */
export const fmtDate = (s) => {
  if (!s) return "—";
  return new Date(typeof s === "string" && !s.includes("T") ? s + "T00:00:00" : s)
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

/**
 * Long date with weekday: "Wednesday, 02 April 2025"
 * Used in booking summary and appointment confirmations.
 * @param {string|null} iso  YYYY-MM-DD
 */
export const fmtDateLong = (iso) => {
  if (!iso) return "—";
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long", day: "2-digit", month: "long", year: "numeric",
  });
};

/**
 * Month + year label: "April 2025"
 * Used in calendar month headers.
 * @param {string} yearMonth  "2025-04"
 */
export const fmtMonthYear = (yearMonth) => {
  const [y, m] = yearMonth.split("-");
  return new Date(+y, +m - 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

// ─── Age ──────────────────────────────────────────────────────────────────────

/**
 * Calculate age in full years from a date-of-birth string.
 * @param {string|null} dob  YYYY-MM-DD
 * @returns {number|null}
 */
export const calcAge = (dob) => {
  if (!dob) return null;
  return Math.floor((Date.now() - new Date(dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25));
};

// ─── Names ────────────────────────────────────────────────────────────────────

/**
 * Extract up-to-two-letter initials, stripping "Dr." prefix.
 * @param {string} name  e.g. "Dr. Arif Hossain"
 * @returns {string}     e.g. "AH"
 */
export const initials = (name = "") =>
  name
    .replace(/^Dr\.?\s*/i, "")
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

// ─── Schedule / calendar ──────────────────────────────────────────────────────

/**
 * Return the full weekday name for a YYYY-MM-DD string.
 * @param {string} iso
 * @returns {string}  e.g. "Wednesday"
 */
export const dayName = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", { weekday: "long" });

/**
 * Build an array of the next N days as YYYY-MM-DD strings, starting tomorrow.
 * @param {number} [count=60]
 * @returns {string[]}
 */
export const nextNDays = (count = 60) => {
  const days = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  for (let i = 1; i <= count; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
};

/**
 * Today's full weekday name.
 * Computed once at module load — safe to share.
 */
export const TODAY_NAME = new Date().toLocaleDateString("en-US", { weekday: "long" });

/**
 * Canonical weekday order used for sorting schedules.
 */
export const DAYS_ORDER = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];