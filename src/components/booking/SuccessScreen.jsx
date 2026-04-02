import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, CalendarCheck, Hash } from "lucide-react";

import { fmtDateLong, fmtTime } from "../../utils/formatters";

const SuccessScreen = ({
  doctorName,
  date,
  serialNo,
  time,
  onBookAnother,
}) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-lg text-center"
      >
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-500/30">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>

        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
          Appointment Booked!
        </h2>

        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Your appointment with{" "}
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {doctorName}
          </span>{" "}
          is confirmed.
        </p>

        {/* Appointment Details Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-left shadow-lg mb-8 space-y-4">
          {/* Highlight Serial */}
          <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-200 dark:border-cyan-800 px-4 py-3">
            <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300 font-semibold">
              <Hash className="w-4 h-4" />
              Serial No
            </div>
            <span className="text-xl font-black text-cyan-600 dark:text-cyan-400">
              #{serialNo}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Doctor</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {doctorName}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Date</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {fmtDateLong(date)}
            </span>
          </div>

          {time && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Time</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {fmtTime(time)}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/patient/dashboard?tab=appointments"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm hover:opacity-90 transition"
          >
            <CalendarCheck className="w-4 h-4" />
            View My Appointments
          </Link>

          <button
            onClick={onBookAnother}
            className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            Book Another
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessScreen;