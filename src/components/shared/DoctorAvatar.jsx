/**
 * components/shared/DoctorAvatar.jsx
 *
 * Renders a doctor's avatar — either their photo or an initials fallback
 * coloured by specialty. Used in DoctorsList, DoctorDetail, and all
 * booking sub-components.
 *
 * Props:
 *   name        {string}           Doctor's full name  (e.g. "Dr. Arif Hossain")
 *   specialty   {string}           Specialty string    (e.g. "Cardiologist")
 *   image       {string|null}      Photo URL if available
 *   size        {"sm"|"md"|"lg"|"xl"}  Defaults to "md"
 *   className   {string}           Extra classes (e.g. ring styles)
 */

import { initials } from "../../utils/formatters";
import { specColor } from "../../utils/specConfig";

const SIZE = {
  sm: "w-8  h-8  text-[10px] rounded-lg",
  md: "w-11 h-11 text-sm     rounded-xl",
  lg: "w-16 h-16 text-xl     rounded-2xl",
  xl: "w-20 h-20 text-2xl    rounded-2xl",
};

const IMG_SIZE = {
  sm: "w-8  h-8  rounded-lg",
  md: "w-11 h-11 rounded-xl",
  lg: "w-16 h-16 rounded-2xl",
  xl: "w-20 h-20 rounded-2xl",
};

/**
 * @param {{ name: string, specialty?: string, image?: string|null, size?: string, className?: string }} props
 */
const DoctorAvatar = ({ name = "", specialty = "", image = null, size = "md", className = "" }) => {
  const { bg, text } = specColor(specialty);
  const sizeClasses   = SIZE[size]     ?? SIZE.md;
  const imgClasses    = IMG_SIZE[size] ?? IMG_SIZE.md;

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className={`${imgClasses} object-cover shrink-0 ${className}`}
      />
    );
  }

  return (
    <div className={`${sizeClasses} ${bg} ${text} flex items-center justify-center font-bold shrink-0 ${className}`}>
      {initials(name)}
    </div>
  );
};

export default DoctorAvatar;