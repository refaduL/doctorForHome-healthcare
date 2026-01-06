import {
  Calendar,
  CheckCircle2,
  Clock,
  Home,
  Mail,
  MessageSquare,
  Phone,
  Sparkles,
  Stethoscope,
  User,
  Video,
} from "lucide-react";
import { useState } from "react";

const BookingAppointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    type: "video",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        type: "video",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const appointmentTypes = [
    {
      value: "video",
      label: "Video Consultation",
      icon: <Video className="w-5 h-5" />,
    },
    { value: "home", label: "Home Visit", icon: <Home className="w-5 h-5" /> },
    {
      value: "clinic",
      label: "In-Clinic",
      icon: <Stethoscope className="w-5 h-5" />,
    },
  ];

  return (
    <section className="relative bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 dark:bg-gradient-to-r dark:from-cyan-500/20 dark:to-purple-500/20 border border-cyan-500/30 rounded-full mb-6 backdrop-blur-sm">
            <Calendar className="w-4 h-4 text-cyan-700 dark:text-cyan-400" />
            <span className="text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm font-semibold tracking-wider uppercase">
              Book Appointment
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400">
              Your health journey
            </span>
            <br />
            <span className="text-slate-800 dark:text-white">starts here</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Schedule a consultation with our expert healthcare professionals at
            your convenience.
          </p>
        </div>

        {/* Form Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 md:p-12">
            {!isSubmitted ? (
              <div className="space-y-6">
                {/* Appointment Type */}
                <div>
                  <label className="block text-slate-800 dark:text-white font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Appointment Type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {appointmentTypes.map((type) => (
                      <label
                        key={type.value}
                        className={`relative cursor-pointer group/radio ${
                          formData.type === type.value
                            ? "ring-2 ring-cyan-500"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="type"
                          value={type.value}
                          checked={formData.type === type.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
                            formData.type === type.value
                              ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/50"
                              : "bg-slate-100 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600"
                          }`}
                        >
                          <div
                            className={`${
                              formData.type === type.value
                                ? "text-cyan-500"
                                : "text-slate-500 dark:text-slate-400"
                            }`}
                          >
                            {type.icon}
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              formData.type === type.value
                                ? "text-slate-900 dark:text-white"
                                : "text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {type.label}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-cyan-400" /> Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-400" /> Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Phone, Date, Time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-pink-400" /> Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cyan-400" /> Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-400" /> Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-pink-400" />{" "}
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about your health concerns..."
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl font-bold text-white text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                  <Calendar className="relative z-10 w-5 h-5" />
                  <span className="relative z-10">Confirm Appointment</span>
                  <Sparkles className="relative z-10 w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mb-6 animate-bounce">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  Appointment Confirmed!
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg mb-2">
                  We've received your booking request.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  A confirmation email will be sent to{" "}
                  <span className="text-cyan-500 dark:text-cyan-400">
                    {formData.email}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
    </section>
  );
};

export default BookingAppointment;
