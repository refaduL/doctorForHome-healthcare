// src/pages/Services.jsx
import React from "react";
import { Video, Calendar, FileText, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <Video className="w-8 h-8 text-blue-500" />,
    title: "Video Consultation",
    desc: "Schedule virtual consultations with certified doctors. Discuss symptoms, receive guidance, and get prescriptions securely from your home.",
    href: "/booking",
  },
  {
    icon: <Calendar className="w-8 h-8 text-green-500" />,
    title: "Home Visit",
    desc: "Book trusted medical professionals to visit your home for examination, treatment, and care. Ideal for patients with mobility issues or chronic conditions.",
    href: "/booking",
  },
  {
    icon: <FileText className="w-8 h-8 text-yellow-500" />,
    title: "Lab Tests",
    desc: "Order laboratory tests from the comfort of home. Our certified technicians collect samples safely, and results are delivered digitally for your convenience.",
    href: "/booking",
  },
  {
    icon: <Stethoscope className="w-8 h-8 text-purple-500" />,
    title: "Health Checkup",
    desc: "Comprehensive health checkup packages for adults and seniors. Early detection and preventive care to keep you healthy and informed.",
    href: "/booking",
  },
];

const Services = () => {
  return (
    <main className="pt-28 pb-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-500 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-4">
          Our Healthcare Services
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
          We provide professional healthcare services designed to make medical care accessible, safe, and convenient for you and your family.
        </p>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                {service.icon}
              </div>

              {/* Title & Description */}
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {service.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-1">
                {service.desc}
              </p>

              {/* CTA Button */}
              <Link
                to={service.href}
                className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-center transition-colors duration-300"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Services;
