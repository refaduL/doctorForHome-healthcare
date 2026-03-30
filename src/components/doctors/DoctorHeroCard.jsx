/**
 * components/doctors/DoctorHeroCard.jsx
 *
 * The top hero card on the DoctorDetail page.
 * Renders: specialty accent strip, avatar, name, tags, qualifications,
 * availability badge, fee panel, and Book Now button.
 *
 * Props:
 *   doctor   {object}   Full doctor record from API
 *   avail    {boolean}  Whether doctor is available today
 *   slots    {number}   Total slots available today
 *   branch   {string}   Resolved branch name
 *   dept     {string}   Resolved department name
 */

import { Link }  from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarCheck, MapPin, Stethoscope,
  GraduationCap, Building2,
} from "lucide-react";

import DoctorAvatar    from "../shared/DoctorAvatar";
import { fmtFee }      from "../../utils/formatters";
import { specColor }   from "../../utils/specConfig";

const DoctorHeroCard = ({ doctor, avail, slots, branch, dept }) => {
  const c = specColor(doctor.specialization);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden mb-5"
    >
      {/* Specialty accent strip */}
      <div className={`h-2 bg-gradient-to-r ${c.grad} w-full`} />

      <div className="p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row gap-5">

          {/* Avatar */}
          <div className="shrink-0">
            <DoctorAvatar
              name={doctor.doctor_name}
              specialty={doctor.specialization}
              image={doctor.image}
              size="xl"
              className="ring-2 ring-slate-100 dark:ring-slate-800"
            />
          </div>

          {/* Name / tags / qualifications */}
          <div className="flex-1 min-w-0">

            {/* Availability pill */}
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border mb-2 ${
              avail
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40"
                : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                avail ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
              }`} />
              {avail ? `Available Today · ${slots} slots` : "Not Available Today"}
            </span>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {doctor.doctor_name}
            </h1>

            {/* Tag pills */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${c.bg} ${c.text}`}>
                <Stethoscope className="w-3 h-3 shrink-0" />
                {doctor.specialization}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <Building2 className="w-3 h-3 shrink-0" /> {dept}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <MapPin className="w-3 h-3 shrink-0" /> {branch.replace(" Branch", "")}
              </span>
            </div>

            {/* Qualifications */}
            {doctor.qualifications && (
              <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400 flex items-start gap-1.5 leading-relaxed">
                <GraduationCap className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                {doctor.qualifications}
              </p>
            )}
          </div>

          {/* Fee + Book — stacked on sm+, inline row on mobile */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:shrink-0 sm:w-40">
            <div className="text-left sm:text-right">
              <p className="text-[10px] uppercase tracking-widest text-slate-400">
                Consultation Fee
              </p>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                {fmtFee(doctor.fee)}
              </p>
              <p className="text-[11px] text-slate-400">per visit</p>
            </div>
            <Link
              to="/booking"
              state={{ doctorId: doctor.doctor_id, doctorName: doctor.doctor_name }}
              className="shrink-0 sm:w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm hover:opacity-90 transition"
            >
              <CalendarCheck className="w-4 h-4 shrink-0" /> Book Now
            </Link>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default DoctorHeroCard;