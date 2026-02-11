// src/pages/DoctorDetail.jsx
import { useParams } from "react-router-dom";
import { Star, Calendar, Clock, MapPin } from "lucide-react";
import { doctors } from "../data/doctor";

const DoctorDetail = () => {
  const { id } = useParams();
  const doctor = doctors.find((doc) => doc.id === id);


  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-600 dark:text-gray-400">
        Doctor not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">

        {/* Top Section */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-800 p-8 md:p-10 flex flex-col md:flex-row gap-10">
          
          {/* Image */}
          <div className="flex-shrink-0">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-48 h-48 rounded-3xl object-cover shadow-md"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
              {doctor.name}
            </h1>

            <p className="text-blue-600 dark:text-blue-400 font-medium mt-2">
              {doctor.specialization}
            </p>

            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {doctor.qualification}
            </p>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {doctor.experience}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-4">
              <Star className="text-yellow-500" size={18} />
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {doctor.rating}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                ({doctor.reviews} reviews)
              </span>
            </div>

            {/* Meta Info */}
            <div className="mt-6 space-y-2 text-gray-600 dark:text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {doctor.location}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                Consultation Fee: {doctor.fee}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
              <button className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                Schedule Later
              </button>

              <button className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-md">
                <Calendar className="inline w-4 h-4 mr-2" />
                Book Appointment
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-10 bg-white dark:bg-gray-900 rounded-3xl shadow-md border border-gray-200 dark:border-gray-800 p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            About Doctor
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {doctor.about}
          </p>
        </div>

      </div>
    </div>
  );
};

export default DoctorDetail;
