/**
 * components/booking/SuccessScreen.jsx
 *
 * Confirmation screen shown after a successful appointment submission.
 * Replaces the full booking form via conditional rendering in Booking.jsx.
 *
 * Props:
 *   doctorName  {string}    e.g. "Dr. Arif Hossain"
 *   date        {string}    YYYY-MM-DD
 *   time        {string}    HH:MM:SS
 *   onBookAnother {()=>void}  Resets the form for a new booking
 */

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, CalendarCheck } from "lucide-react";

import { fmtDateLong, fmtTime } from "../../utils/formatters";

const SuccessScreen = ({ doctorName, date, time, onBookAnother }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md text-center"
    >
      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-500/30">
        <CheckCircle2 className="w-10 h-10 text-white" />
      </div>

      <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
        Appointment Booked!
      </h2>

      <p className="text-slate-500 dark:text-slate-400 mb-1">
        Your appointment with{" "}
        <span className="font-semibold text-slate-700 dark:text-slate-300">{doctorName}</span>
      </p>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        is confirmed for{" "}
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {fmtDateLong(date)}
        </span>
        {time && (
          <>
            {" "}at{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {fmtTime(time)}
            </span>
          </>
        )}.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/patient/dashboard?tab=appointments"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm hover:opacity-90 transition"
        >
          <CalendarCheck className="w-4 h-4" />
          View My Appointments
        </Link>
        <button
          onClick={onBookAnother}
          className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition"
        >
          Book Another
        </button>
      </div>
    </motion.div>
  </div>
);

export default SuccessScreen;