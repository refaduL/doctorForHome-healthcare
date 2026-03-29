/**
 * Booking.jsx  —  pages/Booking.jsx
 *
 * Appointment booking form.
 *
 * Entry points:
 *   1. /booking              → no doctor pre-selected, patient picks from dropdown
 *   2. /booking (via Link)   → router state { doctorId, doctorName } pre-selects doctor
 *
 * Hardcoded patient:
 *   patientID = 1  (swap to req.user.patient_id once auth is wired)
 *
 * Fields submitted to API:
 *   patientID, doctorID, appointment_date, appointment_time, serial_no
 *   (status defaults to "Pending" on the backend)
 *
 * Smart UX:
 *   - Only the doctor's scheduled days are selectable in the calendar
 *   - appointment_time is auto-filled from the matching schedule row
 *   - serial_no is derived: existing bookings for that doctor+date + 1
 *   - Fee, branch, specialization shown live in the summary card
 *   - Slot availability warning when slots are low
 */

import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope, CalendarDays, Clock, MapPin, ChevronLeft,
  ChevronDown, CheckCircle2, AlertCircle, Hash, DollarSign,
  User, Building2, GraduationCap, Info, Loader2, CalendarCheck,
} from "lucide-react";

import { useDoctors } from "../hooks/useDoctors";
import { usePatients } from "../hooks/usePatients";

// constants

// TODO: we will replace with req.user.patient_id once auth is implemented
const PATIENT_ID = 1;

const DAYS_ORDER = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

//  helpers 

const fmtFee = (fee) => fee ? `৳${Number(fee).toLocaleString()}` : "—";

const fmtTime = (t) => {
  if (!t) return "—";
  const [h, m] = t.split(":");
  const d = new Date(); d.setHours(+h, +m);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
};

const fmtDateDisplay = (iso) => {
  if (!iso) return "—";
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long", day: "2-digit", month: "long", year: "numeric",
  });
};

// Returns "Sunday", "Monday", etc. for a given YYYY-MM-DD string
const dayName = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", { weekday: "long" });

// Build the next 60 days as YYYY-MM-DD strings
const next60Days = () => {
  const days = [];
  const today = new Date(); today.setHours(0,0,0,0);
  for (let i = 1; i <= 60; i++) {
    const d = new Date(today); d.setDate(today.getDate() + i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
};

const specColor = (specialty = "") => {
  const s = specialty.toLowerCase();
  if (s.includes("cardio"))  return { bg:"bg-rose-500/10",    text:"text-rose-500"    };
  if (s.includes("neuro"))   return { bg:"bg-violet-500/10",  text:"text-violet-500"  };
  if (s.includes("ortho"))   return { bg:"bg-amber-500/10",   text:"text-amber-500"   };
  if (s.includes("derm"))    return { bg:"bg-pink-500/10",    text:"text-pink-500"    };
  if (s.includes("ophthal")) return { bg:"bg-sky-500/10",     text:"text-sky-500"     };
  if (s.includes("pediatr")) return { bg:"bg-emerald-500/10", text:"text-emerald-500" };
  if (s.includes("onco"))    return { bg:"bg-orange-500/10",  text:"text-orange-500"  };
  return                            { bg:"bg-cyan-500/10",    text:"text-cyan-500"    };
};

const initials = (name = "") =>
  name.replace(/^Dr\.?\s*/i,"").split(" ").slice(0,2).map(n=>n[0]).join("").toUpperCase();

// ─── sub-components ───────────────────────────────────────────────────────────

function Label({ children, required }) {
  return (
    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
      {children}{required && <span className="text-rose-400 ml-0.5">*</span>}
    </label>
  );
}

function FieldWrap({ children, error }) {
  return (
    <div>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-500">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}

function SummaryRow({ icon: Icon, label, value, accent }) {
  if (!value || value === "—") return null;
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-white/10 last:border-0">
      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5 text-white/80" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-widest text-white/50">{label}</p>
        <p className={`text-sm font-semibold truncate ${accent ? "text-white" : "text-white/90"}`}>{value}</p>
      </div>
    </div>
  );
}

// ─── DOCTOR SELECT DROPDOWN ───────────────────────────────────────────────────
function DoctorSelect({ doctors, value, onChange, error }) {
  const [open, setOpen] = useState(false);
  const [q, setQ]       = useState("");

  const filtered = doctors.filter(d =>
    `${d.doctor_name} ${d.specialization}`.toLowerCase().includes(q.toLowerCase())
  );
  const selected = doctors.find(d => String(d.doctor_id) === String(value));

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const h = (e) => { if (!e.target.closest("[data-docselect]")) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  return (
    <div className="relative" data-docselect>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition ${
          error
            ? "border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-900/10"
            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600"
        } ${open ? "ring-2 ring-cyan-500/30 border-cyan-400" : ""}`}
      >
        {selected ? (
          <>
            {/* Avatar */}
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${specColor(selected.specialization).bg} ${specColor(selected.specialization).text}`}>
              {initials(selected.doctor_name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{selected.doctor_name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{selected.specialization}</p>
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 shrink-0">{fmtFee(selected.fee)}</span>
          </>
        ) : (
          <>
            <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
              <Stethoscope className="w-4 h-4 text-slate-400" />
            </div>
            <span className="flex-1 text-sm text-slate-400">Select a doctor…</span>
          </>
        )}
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
            className="absolute z-30 top-full mt-2 left-0 right-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-slate-950/60 overflow-hidden"
          >
            {/* Search inside dropdown */}
            <div className="p-2 border-b border-slate-100 dark:border-slate-800">
              <input
                type="text"
                placeholder="Search doctors…"
                value={q}
                onChange={e => setQ(e.target.value)}
                autoFocus
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            <div className="max-h-64 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-6">No doctors found</p>
              ) : (
                filtered.map(d => {
                  const c = specColor(d.specialization);
                  const isSelected = String(d.doctor_id) === String(value);
                  const branch = d.branch?.location_details || d.branch || "";
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
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${c.bg} ${c.text}`}>
                        {initials(d.doctor_name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{d.doctor_name}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {d.specialization}{branch ? ` · ${branch.replace(" Branch","")}`  : ""}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{fmtFee(d.fee)}</p>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-500 ml-auto mt-0.5" />}
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
}

// ─── CALENDAR ─────────────────────────────────────────────────────────────────
function DatePicker({ availableDays, value, onChange, error }) {
  // availableDays: Set of day names like {"Sunday","Wednesday"}
  const allDays = useMemo(() => next60Days(), []);

  // Group by month for display
  const byMonth = useMemo(() => {
    const groups = {};
    allDays.forEach(iso => {
      const key = iso.slice(0, 7); // "2025-04"
      if (!groups[key]) groups[key] = [];
      groups[key].push(iso);
    });
    return groups;
  }, [allDays]);

  const [visibleMonth, setVisibleMonth] = useState(() => Object.keys(byMonth)[0]);
  const months = Object.keys(byMonth);

  const monthLabel = (key) => {
    const [y, m] = key.split("-");
    return new Date(+y, +m - 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Build full calendar grid (pad with nulls for alignment)
  const calDays = byMonth[visibleMonth] || [];
  // Find the day-of-week of the first available day in this month view
  // We'll build a mini-calendar showing the month grid
  const firstOfMonth = new Date(visibleMonth + "-01T00:00:00");
  const startPad = firstOfMonth.getDay(); // 0=Sun

  // All days in that calendar month
  const daysInMonth = new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth() + 1, 0).getDate();
  const gridCells = [];
  for (let i = 0; i < startPad; i++) gridCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${visibleMonth}-${String(d).padStart(2,"0")}`;
    gridCells.push(iso);
  }

  const today = new Date(); today.setHours(0,0,0,0);
  const isSelectable = (iso) => {
    if (!iso) return false;
    const dt = new Date(iso + "T00:00:00"); dt.setHours(0,0,0,0);
    if (dt <= today) return false;
    if (availableDays.size === 0) return false;
    return availableDays.has(dayName(iso));
  };

  const monthIdx = months.indexOf(visibleMonth);

  return (
    <div className={`rounded-xl border ${error ? "border-rose-300 dark:border-rose-700" : "border-slate-200 dark:border-slate-700"} bg-white dark:bg-slate-900 overflow-hidden`}>
      {/* Month nav */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
        <button type="button" onClick={() => setVisibleMonth(months[monthIdx - 1])}
          disabled={monthIdx === 0}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition">
          <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        </button>
        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{monthLabel(visibleMonth)}</span>
        <button type="button" onClick={() => setVisibleMonth(months[monthIdx + 1])}
          disabled={monthIdx === months.length - 1}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition">
          <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400 -rotate-90" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 px-3 pt-2">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
          <div key={d} className="text-center text-[10px] font-bold uppercase tracking-wider text-slate-400 py-1.5">{d}</div>
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
                    ? "text-slate-900 dark:text-white hover:bg-cyan-50 dark:hover:bg-cyan-900/20 hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer"
                    : "text-slate-300 dark:text-slate-700 cursor-not-allowed"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      {availableDays.size > 0 && (
        <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 flex-wrap">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Available:</span>
          {DAYS_ORDER.filter(d => availableDays.has(d)).map(d => (
            <span key={d} className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 px-2 py-0.5 rounded-full">
              {d.slice(0,3)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Pre-fill from router state (coming from DoctorDetail / DoctorsList "Book Now")
  const preDoctor = location.state?.doctorId  ? String(location.state.doctorId)  : "";

  const { doctors, loading: doctorsLoading } = useDoctors();
  const { fetchPatient, loading } = usePatients();

  //  form state 
  const [doctorId, setDoctorId] = useState(preDoctor);
  const [date,     setDate]     = useState("");
  const [errors,   setErrors]   = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);

  // ── derived: selected doctor object ────────────────────────────────────────
  const doctor = useMemo(
    () => doctors.find(d => String(d.doctor_id) === doctorId) || null,
    [doctors, doctorId]
  );


  // Reset date when doctor changes
  useEffect(() => { setDate(""); }, [doctorId]);

  // ── derived: schedule info ──────────────────────────────────────────────────
  const schedules = doctor?.schedules || [];
  const availableDays = useMemo(
    () => new Set(schedules.map(s => s.days).filter(Boolean)),
    [schedules]
  );

  // Schedule row matching selected date
  const matchedSchedule = useMemo(() => {
    if (!date) return null;
    return schedules.find(s => s.days?.toLowerCase() === dayName(date).toLowerCase()) || null;
  }, [schedules, date]);

  const appointmentTime = matchedSchedule?.doc_sc.time || "";
  const totalSlots      = matchedSchedule?.doc_sc.slots   || 0;

  // Serial no: simulated as 1 here — real impl: GET /api/appointments/count?doctorId=X&date=Y + 1
  // TODO: fetch count of existing appts for doctor+date, then +1
  const serialNo = 1; 

  // ── validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!doctorId)  e.doctorId = "Please select a doctor.";
    if (!date)      e.date     = "Please select an appointment date.";
    return e;
  };

  // ── submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSubmitting(true);

    const payload = {
      patientID:        PATIENT_ID,      // hardcoded until auth
      doctorID:         Number(doctorId),
      appointment_date: date,
      appointment_time: appointmentTime || "17:00:00",
      serial_no:        serialNo,
      // status defaults to "Pending" on the server
    };

    try {
      const res = await fetch("/api/appointments", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
    } catch {
      setErrors({ submit: "Booking failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  // ── success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <motion.div
          initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
          transition={{ duration:0.3 }}
          className="w-full max-w-md text-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-500/30">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Appointment Booked!</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-1">
            Your appointment with <span className="font-semibold text-slate-700 dark:text-slate-300">{doctor?.doctor_name}</span>
          </p>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            is confirmed for <span className="font-semibold text-slate-700 dark:text-slate-300">{fmtDateDisplay(date)}</span>
            {appointmentTime && <> at <span className="font-semibold text-slate-700 dark:text-slate-300">{fmtTime(appointmentTime)}</span></>}.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/patient/dashboard?tab=appointments"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm hover:opacity-90 transition">
              View My Appointments
            </Link>
            <button onClick={() => { setSubmitted(false); setDoctorId(""); setDate(""); }}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition">
              Book Another
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── main form ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3 }} className="mb-8">
          <Link to="/doctors" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition mb-4">
            <ChevronLeft className="w-4 h-4" /> Back to Doctors
          </Link>
          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-2">
            <CalendarCheck className="w-3.5 h-3.5" /> Book Appointment
          </span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Schedule a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">
              Consultation
            </span>
          </h1>
          <p className="mt-1.5 text-slate-500 dark:text-slate-400 text-sm">
            Choose your doctor and a convenient date to get started.
          </p>
        </motion.div>

        {/* Patient notice */}
        <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.25, delay:0.05 }}
          className="flex items-start gap-3 px-4 py-3 mb-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
            Booking as <span className="font-bold">Patient #1</span>. Once authentication is added, this will automatically use your account.
          </p>
        </motion.div>

        {/* Two-column layout: Form left, Summary right */}
        <div className="grid lg:grid-cols-5 gap-6 items-start">

          {/* ── FORM (3 cols) ──────────────────────────────────────────────── */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.3, delay:0.08 }}
            className="lg:col-span-3 flex flex-col gap-5"
          >

            {/* Step 1: Doctor */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                  <span className="text-white text-[10px] font-black">1</span>
                </div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Select Doctor</h2>
              </div>

              <FieldWrap error={errors.doctorId}>
                <Label required>Doctor</Label>
                {doctorsLoading ? (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-400">
                    <Loader2 className="w-4 h-4 animate-spin" /> Loading doctors…
                  </div>
                ) : (
                  <DoctorSelect
                    doctors={doctors}
                    value={doctorId}
                    onChange={(id) => { setDoctorId(id); setErrors(e => ({ ...e, doctorId: "" })); }}
                    error={errors.doctorId}
                  />
                )}
              </FieldWrap>

              {/* Doctor info strip — shows after selection */}
              <AnimatePresence>
                {doctor && (
                  <motion.div
                    initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }}
                    exit={{ opacity:0, height:0 }} transition={{ duration:0.2 }}
                    className="mt-4 overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                      {[
                        { Icon: Building2,    val: (doctor.branch?.location_details || doctor.branch || "").replace(" Branch","") },
                        { Icon: Stethoscope,  val: doctor.dept?.dept_name || doctor.dept },
                        { Icon: GraduationCap,val: doctor.qualifications },
                      ].filter(r => r.val).map(({ Icon, val }, i) => (
                        <span key={i} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg">
                          <Icon className="w-3 h-3 text-slate-400 shrink-0" /> {val}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Step 2: Date */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  doctorId
                    ? "bg-gradient-to-br from-cyan-500 to-blue-600"
                    : "bg-slate-200 dark:bg-slate-700"
                }`}>
                  <span className={`text-[10px] font-black ${doctorId ? "text-white" : "text-slate-500 dark:text-slate-400"}`}>2</span>
                </div>
                <h2 className={`text-sm font-bold ${doctorId ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-600"}`}>
                  Select Date
                </h2>
                {!doctorId && (
                  <span className="text-xs text-slate-400 dark:text-slate-600 ml-1">— select a doctor first</span>
                )}
              </div>

              {doctorId ? (
                <FieldWrap error={errors.date}>
                  <DatePicker
                    availableDays={availableDays}
                    value={date}
                    onChange={(d) => { setDate(d); setErrors(e => ({ ...e, date: "" })); }}
                    error={errors.date}
                  />
                </FieldWrap>
              ) : (
                <div className="h-24 flex items-center justify-center rounded-xl border border-dashed border-slate-200 dark:border-slate-700 text-sm text-slate-400 dark:text-slate-600">
                  Select a doctor to see available dates
                </div>
              )}
            </div>

            {/* Step 3: Time + serial (auto, read-only) */}
            <AnimatePresence>
              {date && matchedSchedule && (
                <motion.div
                  initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, y:-6 }} transition={{ duration:0.22 }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                      <span className="text-white text-[10px] font-black">3</span>
                    </div>
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white">Appointment Details</h2>
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-slate-400">Auto-assigned</span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {/* Time */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-cyan-500" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-0.5">Consultation Time</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{fmtTime(appointmentTime)}</p>
                      </div>
                    </div>

                    {/* Serial */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                      <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
                        <Hash className="w-4 h-4 text-violet-500" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-0.5">Your Serial No.</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">#{serialNo}</p>
                      </div>
                    </div>
                  </div>

                  {/* Slot warning */}
                  {totalSlots > 0 && totalSlots <= 3 && (
                    <div className="mt-3 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40">
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                      <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                        Only {totalSlots} slot{totalSlots !== 1 ? "s" : ""} remaining on this day. Book soon.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit error */}
            {errors.submit && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/40">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <p className="text-sm text-rose-600 dark:text-rose-400">{errors.submit}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || !doctorId || !date}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
            >
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Booking…</>
              ) : (
                <><CalendarCheck className="w-4 h-4" /> Confirm Appointment</>
              )}
            </button>

            <p className="text-xs text-center text-slate-400 dark:text-slate-500 -mt-1">
              Status will be set to <span className="font-semibold">Pending</span> until confirmed by the clinic.
            </p>

          </motion.form>

          {/* ── SUMMARY CARD (2 cols) ──────────────────────────────────────── */}
          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:0.32, delay:0.12 }}
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 dark:from-slate-900 dark:via-slate-950 dark:to-black rounded-2xl p-6 text-white">
                {/* Decorative circles */}
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-cyan-500/10" />
                <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-purple-500/10" />
                <div className="absolute top-1/2 -left-4 w-12 h-12 rounded-full bg-blue-500/10" />

                {/* Heading */}
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4">Booking Summary</p>

                {/* Doctor block */}
                {doctor ? (
                  <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/10">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-base font-black shrink-0 ${specColor(doctor.specialization).bg} ${specColor(doctor.specialization).text}`}>
                      {initials(doctor.doctor_name)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-white leading-tight truncate">{doctor.doctor_name}</p>
                      <p className="text-xs text-white/60 mt-0.5 truncate">{doctor.specialization}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <Stethoscope className="w-5 h-5 text-white/30" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white/30">No doctor selected</p>
                      <p className="text-xs text-white/20 mt-0.5">Select a doctor to see details</p>
                    </div>
                  </div>
                )}

                {/* Summary rows */}
                <div className="space-y-0">
                  <SummaryRow icon={CalendarDays} label="Date"     value={date ? fmtDateDisplay(date) : "—"} />
                  <SummaryRow icon={Clock}        label="Time"     value={appointmentTime ? fmtTime(appointmentTime) : (date ? "—" : "—")} />
                  <SummaryRow icon={Hash}         label="Serial"   value={date && appointmentTime ? `#${serialNo}` : "—"} />
                  <SummaryRow icon={MapPin}       label="Branch"   value={(doctor?.branch?.location_details || doctor?.branch || "").replace(" Branch","")} />
                  <SummaryRow icon={User}         label="Patient"  value={`Patient #${PATIENT_ID}`} />
                </div>

                {/* Fee highlight */}
                {doctor && (
                  <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-white/50" />
                      <span className="text-sm text-white/60 font-semibold">Consultation Fee</span>
                    </div>
                    <span className="text-xl font-black text-white">{fmtFee(doctor.fee)}</span>
                  </div>
                )}

                {/* Status note */}
                <div className="mt-4 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                  <p className="text-xs text-white/50 font-semibold">Booking status: <span className="text-amber-400">Pending</span></p>
                </div>
              </div>

              {/* Info note below card */}
              <div className="mt-3 flex items-start gap-2 px-1">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  Appointment time is automatically set based on the doctor's schedule.
                  Serial number is assigned in order of bookings for that day.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Booking;