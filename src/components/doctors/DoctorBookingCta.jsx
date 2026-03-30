/**
 * components/doctors/DoctorBookingCta.jsx
 *
 * Gradient "Ready to consult?" CTA card in the DoctorDetail sidebar.
 * Shows slot count when available today, otherwise a generic prompt.
 *
 * Props:
 *   doctor  {object}   Full doctor record (needs doctor_id, doctor_name)
 *   avail   {boolean}  Available today?
 *   slots   {number}   Slots open today
 */

import { Link }  from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";

const DoctorBookingCta = ({ doctor, avail, slots }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.28, delay: 0.16 }}
    className="relative overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-2xl p-5 text-white"
  >
    {/* Decorative circles */}
    <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-white/10" />
    <div className="absolute bottom-1 right-6 w-12 h-12 rounded-full bg-white/10" />

    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-100 mb-1">
      Ready to consult?
    </p>
    <p className="text-base font-black leading-snug">{doctor.doctor_name}</p>
    <p className="text-sm text-blue-100 mt-1 mb-4">
      {avail ? `${slots} slots open today` : "Book a future appointment"}
    </p>

    <Link
      to="/booking"
      state={{ doctorId: doctor.doctor_id, doctorName: doctor.doctor_name }}
      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition"
    >
      <CalendarCheck className="w-4 h-4 shrink-0" /> Book Appointment
    </Link>
  </motion.div>
);

export default DoctorBookingCta;