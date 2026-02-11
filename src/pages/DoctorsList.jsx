// src/pages/DoctorsList.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { doctors } from "../data/doctor";


const DoctorsList = () => {
  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.name} ${doctor.specialization}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
            Find Your Doctor
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Browse certified specialists and book appointments instantly.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-14 max-w-2xl mx-auto">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by doctor name or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-5 py-4 rounded-xl
                       bg-white dark:bg-gray-900
                       border border-gray-300 dark:border-gray-700
                       text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       shadow-sm"
          />
        </div>

        {/* Doctors List */}
        <div className="space-y-8">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="group flex flex-col md:flex-row items-center md:items-start justify-between gap-6
                         bg-white dark:bg-gray-900
                         border border-gray-200 dark:border-gray-800
                         rounded-2xl p-6
                         shadow-md hover:shadow-xl
                         transition-all duration-300"
            >
              {/* Left */}
              <div className="flex items-center gap-6 w-full md:w-auto">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-2xl object-cover shadow-sm"
                />

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {doctor.name}
                  </h3>

                  <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">
                    {doctor.specialization}
                  </p>

                  <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                    {doctor.experience}
                  </p>

                  <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full
                                   bg-green-100 text-green-700
                                   dark:bg-green-900/40 dark:text-green-400">
                    {doctor.availability}
                  </span>
                </div>
              </div>

              {/* Right */}
              <div className="flex gap-3 mt-4 md:mt-0">
                <Link
                  to={`/doctors/${doctor.id}`}
                  className="px-6 py-2.5 rounded-lg
                            border border-gray-300 dark:border-gray-700
                            text-gray-700 dark:text-gray-300
                            hover:bg-gray-100 dark:hover:bg-gray-800
                            transition text-center"
                >
                  View Profile
                </Link>


                <button
                  className="px-6 py-2.5 rounded-lg
                             bg-blue-600 text-white
                             hover:bg-blue-700
                             transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-12">
            No doctors found.
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
