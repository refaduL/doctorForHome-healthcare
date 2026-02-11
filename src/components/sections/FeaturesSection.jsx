import { Clock, FileText, Home, Pill, Shield, Video } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: <Video className="w-6 h-6" />,
      title: "Virtual Consultations",
      desc: "Connect with specialists instantly through secure HD video calls from anywhere.",
      gradient: "from-cyan-500 to-blue-600",
      bgGlow: "bg-cyan-500/10",
      iconBg: "from-cyan-400 to-blue-500",
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Home Healthcare",
      desc: "Professional medical care delivered to your doorstep with certified nurses.",
      gradient: "from-emerald-500 to-teal-600",
      bgGlow: "bg-emerald-500/10",
      iconBg: "from-emerald-400 to-teal-500",
    },
    {
      icon: <Pill className="w-6 h-6" />,
      title: "E-Prescription",
      desc: "Digital prescriptions sent directly to your pharmacy with medication reminders.",
      gradient: "from-purple-500 to-indigo-600",
      bgGlow: "bg-purple-500/10",
      iconBg: "from-purple-400 to-indigo-500",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Availability",
      desc: "Round-the-clock access to medical professionals whenever you need support.",
      gradient: "from-orange-500 to-amber-600",
      bgGlow: "bg-orange-500/10",
      iconBg: "from-orange-400 to-amber-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "HIPAA Compliant",
      desc: "Military-grade encryption ensures your health data stays private and secure.",
      gradient: "from-blue-500 to-indigo-600",
      bgGlow: "bg-blue-500/10",
      iconBg: "from-blue-400 to-indigo-500",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Digital Health Records",
      desc: "Access your complete medical history instantly from anywhere, anytime.",
      gradient: "from-teal-500 to-cyan-600",
      bgGlow: "bg-teal-500/10",
      iconBg: "from-teal-400 to-cyan-500",
    },
  ];

  return (
    <section id="features" className="relative bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 overflow-hidden">
      {/* soft background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 dark:bg-gradient-to-r dark:from-cyan-500/20 dark:to-purple-500/20 border border-cyan-500/30 rounded-full mb-6 backdrop-blur-sm">
            <span className="text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm font-semibold tracking-wider uppercase">
              Platform Features
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400">
              Healthcare reimagined
            </span>
            <br />
            <span className="text-slate-800 dark:text-white">
              for digital age
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Experience next-generation telemedicine with technology that puts
            you in control.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="group relative">
              <div
                className={`absolute -inset-0.5 ${feature.bgGlow} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500`}
              ></div>

              <div className="relative bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 sm:p-7 transition-all duration-500 group-hover:-translate-y-2 shadow-sm dark:shadow-none">
                {/* Icon + Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-500`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>

                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-[15px] leading-relaxed">
                  {feature.desc}
                </p>

                {/* Bottom Accent */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition duration-500 rounded-b-3xl`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
    </section>
  );
};

export default FeatureSection;
