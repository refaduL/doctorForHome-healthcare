/**
 * pages/Booking.jsx
 *
 * Appointment booking page — orchestrates state and API call only.
 * All UI is delegated to components/booking/*.
 * All formatting is imported from utils/formatters.js.
 *
 * Entry points:
 *   /booking                   → no doctor pre-selected
 *   /booking  (router state)   → { doctorId, doctorName } pre-selects doctor
 *
 * Hardcoded patient:
 *   PATIENT_ID = 1
 *   → swap to req.user.patient_id once auth is wired
 *
 * API payload sent on submit:
 *   { patientID, doctorID, appointment_date, appointment_time, serial_no }
 *   status defaults to "Pending" on the backend (appointments model default)
 */

import { useEffect, useMemo, useState } from "react";
import { Link, useLocation }            from "react-router-dom";
import { motion, AnimatePresence }       from "framer-motion";
import {
  ChevronLeft, CalendarCheck, Info,
  AlertCircle, Loader2, Building2,
  Stethoscope, GraduationCap,
} from "lucide-react";


import { useAuth } from "../hooks/useAuth";
import { useDoctors } from "../hooks/useDoctors";
import { useAppointment } from "../hooks/useAppointment";
import { dayName }    from "../utils/formatters";

// Booking sub-components
import DoctorSelect       from "../components/booking/DoctorSelect";
import DatePicker         from "../components/booking/DatePicker";
import AppointmentDetails from "../components/booking/AppointmentDetails";
import BookingSummary     from "../components/booking/BookingSummary";
import SuccessScreen      from "../components/booking/SuccessScreen";
import { showSuccess } from "../utils/toast";

// ─── small local primitives (form-only, not shared) ───────────────────────────

function StepBadge({ n, active }) {
  return (
    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
      active
        ? "bg-gradient-to-br from-cyan-500 to-blue-600"
        : "bg-slate-200 dark:bg-slate-700"
    }`}>
      <span className={`text-[10px] font-black ${active ? "text-white" : "text-slate-500 dark:text-slate-400"}`}>
        {n}
      </span>
    </div>
  );
}

function StepCard({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 ${className}`}>
      {children}
    </div>
  );
}

function StepHeading({ n, active, title, hint }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <StepBadge n={n} active={active} />
      <h2 className={`text-sm font-bold ${active ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-600"}`}>
        {title}
      </h2>
      {hint && <span className="text-xs text-slate-400 dark:text-slate-600 ml-1">{hint}</span>}
    </div>
  );
}

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-500">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {message}
    </p>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const Booking = () => {
  const location  = useLocation();
  const preDoctor = location.state?.doctorId ? String(location.state.doctorId) : "";

  const { user } = useAuth();
  const { createAppointment } = useAppointment();
  const { doctors, loading: doctorsLoading } = useDoctors();

  // ── Form state ──────────────────────────────────────────────────────────────
  const [doctorId,   setDoctorId]   = useState(preDoctor);
  const [date,       setDate]       = useState("");
  const [errors,     setErrors]     = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);

  const [serialNo, setSerialNo]     = useState(1);

  // ── Derived: selected doctor ────────────────────────────────────────────────
  const doctor = useMemo(
    () => doctors.find((d) => String(d.doctor_id) === doctorId) ?? null,
    [doctors, doctorId]
  );

  // Reset date whenever the doctor changes
  useEffect(() => { setDate(""); }, [doctorId]);

  // ── Derived: schedule-based values ─────────────────────────────────────────
  const schedules = doctor?.schedules ?? [];

  const availableDays = useMemo(
    () => new Set(schedules.map((s) => s.days).filter(Boolean)),
    [schedules]
  );

  const matchedSchedule = useMemo(
    () => (date ? schedules.find((s) => s.days?.toLowerCase() === dayName(date).toLowerCase()) ?? null : null),
    [schedules, date]
  );

  const appointmentTime = matchedSchedule?.doc_sc.time ?? "";
  const totalSlots      = matchedSchedule?.slots   ?? 0;

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!doctorId) e.doctorId = "Please select a doctor.";
    if (!date)     e.date     = "Please select an appointment date.";
    return e;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSubmitting(true);

    const payload = {
      patientID:        Number(user.id),
      doctorID:         Number(doctorId),
      appointment_date: date,
      appointment_time: appointmentTime || "17:00:00",
      serial_no:        serialNo,
    };

    try {
      const data = await createAppointment(payload);
      if (!data.success) throw new Error("Server error");
      setSerialNo(data.payload.serial_no);
      setSubmitted(true);
      showSuccess(data?.message);
    } catch {
      setErrors((prev) => ({ ...prev, submit: "Booking failed. Please try again." }));
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setDoctorId("");
    setDate("");
    setErrors({});
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <SuccessScreen
        doctorName={doctor?.doctor_name ?? ""}
        date={date}
        serialNo={serialNo}
        time={appointmentTime}
        onBookAnother={resetForm}
      />
    );
  }

  // ── Booking form ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }} className="mb-8"
        >
          <Link to="/doctors"
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition mb-4">
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

        {/* Auth notice */}
        {/* <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="flex items-start gap-3 px-4 py-3 mb-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40"
        >
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
            Booking as <span className="font-bold">Patient #{user?.name}</span>.
            Once authentication is added, this will automatically use your account.
          </p>
        </motion.div> */}

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-5 gap-6 items-start">

          {/* ── FORM (3/5 cols) ─────────────────────────────────────────────── */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="lg:col-span-3 flex flex-col gap-5"
          >

            {/* Step 1 — Doctor */}
            <StepCard>
              <StepHeading n="1" active title="Select Doctor" />

              {doctorsLoading ? (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-400">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading doctors…
                </div>
              ) : (
                <>
                  <DoctorSelect
                    doctors={doctors}
                    value={doctorId}
                    onChange={(id) => { setDoctorId(id); setErrors((e) => ({ ...e, doctorId: "" })); }}
                    error={errors.doctorId}
                  />
                  <FieldError message={errors.doctorId} />
                </>
              )}

              {/* Doctor meta strip — slides in after selection */}
              <AnimatePresence>
                {doctor && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                      {[
                        {
                          Icon: Building2,
                          val: (doctor.branch?.location_details || doctor.branch || "").replace(" Branch", ""),
                        },
                        { Icon: Stethoscope,   val: doctor.dept?.dept_name || doctor.dept },
                        { Icon: GraduationCap, val: doctor.qualifications },
                      ]
                        .filter((r) => r.val)
                        .map(({ Icon, val }, i) => (
                          <span key={i} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg">
                            <Icon className="w-3 h-3 text-slate-400 shrink-0" /> {val}
                          </span>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </StepCard>

            {/* Step 2 — Date */}
            <StepCard>
              <StepHeading
                n="2"
                active={!!doctorId}
                title="Select Date"
                hint={!doctorId ? "— select a doctor first" : undefined}
              />

              {doctorId ? (
                <>
                  <DatePicker
                    availableDays={availableDays}
                    value={date}
                    onChange={(d) => { setDate(d); setErrors((e) => ({ ...e, date: "" })); }}
                    error={errors.date}
                  />
                  <FieldError message={errors.date} />
                </>
              ) : (
                <div className="h-24 flex items-center justify-center rounded-xl border border-dashed border-slate-200 dark:border-slate-700 text-sm text-slate-400 dark:text-slate-600">
                  Select a doctor to see available dates
                </div>
              )}
            </StepCard>

            {/* Step 3 — Auto-assigned details (only shows when date is picked) */}
            <AnimatePresence>
              {date && matchedSchedule && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}
                >
                  <StepCard>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <StepBadge n="3" active />
                        <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                          Appointment Details
                        </h2>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Auto-assigned
                      </span>
                    </div>

                    <AppointmentDetails
                      time={appointmentTime}
                      serialNo={serialNo}
                      totalSlots={totalSlots}
                    />
                  </StepCard>
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

            {/* Submit button */}
            <button
              type="submit"
              disabled={submitting || !doctorId || !date}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
            >
              {submitting
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Booking…</>
                : <><CalendarCheck className="w-4 h-4" /> Confirm Appointment</>
              }
            </button>

            <p className="text-xs text-center text-slate-400 dark:text-slate-500 -mt-1">
              Status will be set to <span className="font-semibold">Pending</span> until confirmed by the clinic.
            </p>
          </motion.form>

          {/* ── SUMMARY (2/5 cols) ───────────────────────────────────────────── */}
          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.32, delay: 0.12 }}
            >
              <BookingSummary
                doctor={doctor}
                date={date}
                time={appointmentTime}
                serialNo={serialNo}
                patientName={user?.name}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Booking;