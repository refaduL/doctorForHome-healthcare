/**
 * components/doctors/DoctorDetailsCard.jsx
 *
 * Sidebar card on DoctorDetail showing structured doctor info fields.
 * Animated entry. Renders nothing for null/undefined field values.
 *
 * Props:
 *   doctor  {object}   Full doctor record
 *   branch  {string}   Resolved branch name
 *   dept    {string}   Resolved department name
 *   age     {number|null}
 */

import { motion } from "framer-motion";
import {
  MapPin, Building2, DollarSign,
  UserCircle2, CalendarDays, Mail, Phone, Stethoscope,
} from "lucide-react";

import DoctorInfoField  from "./DoctorInfoField";
import { fmtFee, fmtDate } from "../../utils/formatters";

const DoctorDetailsCard = ({ doctor, branch, dept, age }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.28, delay: 0.1 }}
    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
  >
    <h2 className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">
      <Stethoscope className="w-4 h-4 text-cyan-500 shrink-0" />
      Details
    </h2>

    <DoctorInfoField Icon={MapPin}       label="Branch"     value={branch}                      />
    <DoctorInfoField Icon={Building2}    label="Department" value={dept}                        />
    <DoctorInfoField Icon={DollarSign}   label="Fee"        value={fmtFee(doctor.fee)}          />
    {age && (
      <DoctorInfoField Icon={UserCircle2} label="Age"       value={`${age} years`}              />
    )}
    <DoctorInfoField Icon={CalendarDays} label="Joined"     value={fmtDate(doctor.joining_date)} />
    <DoctorInfoField Icon={Mail}         label="Email"      value={doctor.email}                />
    <DoctorInfoField Icon={Phone}        label="Mobile"     value={doctor.mobile}               />
  </motion.div>
);

export default DoctorDetailsCard;