import {
  FaAmbulance,
  FaCalendarCheck,
  FaClock,
  FaFlask,
  FaHospital,
  FaMicroscope,
  FaStethoscope,
  FaUserMd,
  FaUsers,
} from "react-icons/fa";
import TestingCard from "../customized/TestingCard";
import Card from "../customized/Card";

const features = [
  {
    icon: <FaStethoscope />,
    title: "Advanced Diagnosis",
    desc: "Quick and precise care results",
  },
  {
    icon: <FaHospital />,
    title: "Modern Surgical",
    desc: "Equipped for safe & precise surgeries",
  },
  {
    icon: <FaFlask />,
    title: "Innovative Treatments",
    desc: "Access to medical advancements",
  },
  {
    icon: <FaUsers />,
    title: "Patient-Centric Care",
    desc: "Treatment plans tailored to you",
  },
  {
    icon: <FaUserMd />,
    title: "Specialized Staff",
    desc: "Experts across every specialty",
  },
  {
    icon: <FaCalendarCheck />,
    title: "Smooth Appointment",
    desc: "Easy, fast, and simple bookings",
  },
  {
    icon: <FaAmbulance />,
    title: "Emergency Response",
    desc: "Fast, expert action when it matters",
  },
  {
    icon: <FaClock />,
    title: "24/7 Patient Support",
    desc: "Care and guidance you need",
  },
  {
    icon: <FaMicroscope />,
    title: "In-House Lab Testing",
    desc: "Fast results without the wait",
  },
];

export default function FeatureSection() {
  return (
    <section className="w-full bg-gradient-to-br from-[#f7fafc] to-[#eef3f8] text-gray-800">
      <div className="max-w-7xl px-6 py-20 mx-auto text-center">
        {/* Heading */}
        <h3 className="text-center text-md uppercase font-semibold tracking-wider text-muted mb-2">
          [Feature]
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold mb-14 leading-snug">
          Healthcare features designed for clarity and care
        </h2>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="relative flex items-start p-6 bg-white/90 rounded-tl-[25px] rounded-br-[25px] shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-100 hover:scale-[1.02] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#e8f5f9] before:to-[#f3f7fa] before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300 overflow-hidden"
            >
              {/* Icon */}
              <div className="relative z-10 flex-shrink-0 mr-4 text-3xl text-blue-700 bg-blue-100/60 p-4 rounded-tl-[15px] rounded-br-[15px] shadow-sm">
                {feature.icon}
              </div>

              {/* Text */}
              <div className="relative z-10 text-left">
                <h4 className="text-lg font-semibold mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
