import { Heart, Shield, Sparkles, TrendingUp, Users } from "lucide-react";

const AboutUs = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Experienced Care Team",
      desc: "Our caregivers combine expertise with compassion, ensuring every patient feels valued and safe.",
      gradient: "from-cyan-500 to-blue-500",
      bgGlow: "bg-cyan-500/10",
      iconBg: "from-cyan-400 to-blue-500",
    },
    {
      icon: <Heart className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Personalized Care Plans",
      desc: "We tailor every care plan to match each patient's medical and emotional needs.",
      gradient: "from-pink-500 to-rose-500",
      bgGlow: "bg-pink-500/10",
      iconBg: "from-pink-400 to-rose-500",
    },
    {
      icon: <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Holistic Well-Being",
      desc: "From nutrition to emotional support, we promote all-round well-being.",
      gradient: "from-purple-500 to-indigo-500",
      bgGlow: "bg-purple-500/10",
      iconBg: "from-purple-400 to-indigo-500",
    },
    {
      icon: <Shield className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Safe & Comfortable Environment",
      desc: "Clean, calm, and technologically advanced facilities for your peace of mind.",
      gradient: "from-emerald-500 to-teal-500",
      bgGlow: "bg-emerald-500/10",
      iconBg: "from-emerald-400 to-teal-500",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-white dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-400/20 dark:bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-purple-400/20 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-pink-400/10 dark:bg-pink-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-24">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span className="text-xs sm:text-sm text-cyan-600 dark:text-cyan-300 font-semibold tracking-wider uppercase">
              Who We Are
            </span>
          </div>

          <h2 className="font-bold leading-tight mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
              Care that respects,
            </span>
            <br />
            <span className="text-slate-900 dark:text-white">
              comforts, and supports
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base md:text-lg">
            We believe in more than treatment. We deliver comfort, confidence,
            and care that truly matters.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, idx) => (
            <div key={idx} className="group relative">
              <div
                className={`absolute -inset-0.5 ${feature.bgGlow} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500`}
              />

              <div className="relative h-full rounded-3xl p-6 sm:p-7 lg:p-8 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 transition-all duration-500 group-hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-purple-500 text-base sm:text-lg">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-[15px]">
                  {feature.desc}
                </p>

                <div
                  className={`absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-gradient-to-r ${feature.gradient} opacity-60`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="group relative inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl font-bold text-white transition hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40 text-sm sm:text-base lg:text-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 blur transition" />
            <span className="relative z-10">Know More</span>
            <TrendingUp className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
    </section>
  );
};

export default AboutUs;
