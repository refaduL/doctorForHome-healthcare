import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  Shield,
  Sparkles,
  Star,
  Video,
  Zap,
} from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="
      relative min-h-screen flex items-center overflow-hidden
      bg-gradient-to-br from-slate-50 via-white to-blue-50
      dark:from-slate-900 dark:via-indigo-900 dark:to-slate-800
    "
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
          absolute top-20 -left-24 w-[520px] h-[520px] rounded-full blur-3xl
          bg-blue-400/20 dark:bg-cyan-500/20
        "
        />
        <div
          className="
          absolute bottom-20 -right-24 w-[520px] h-[520px] rounded-full blur-3xl
          bg-indigo-400/20 dark:bg-indigo-500/20
        "
        />
        <div
          className="
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[420px] h-[420px] rounded-full blur-3xl
          bg-blue-300/10 dark:bg-blue-500/10
        "
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <div className="space-y-8">
            {/* badge */}
            <div
              className="
              inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm
              bg-blue-100 border border-blue-200
              dark:bg-blue-500/15 dark:border-blue-400/30
            "
            >
              <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span
                className="
                text-sm font-semibold
                text-blue-700 dark:text-blue-300
              "
              >
                Available 24/7 • Emergency Care
              </span>
            </div>

            {/* heading */}
            <div className="space-y-4">
              <h1 className="font-black leading-tight">
                <span className="block text-4xl sm:text-5xl md:text-6xl text-slate-900 dark:text-white">
                  CARE.
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                  EXCELLENCE.
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                  FUTURE.
                </span>
              </h1>

              <p
                className="
                max-w-xl text-base sm:text-lg md:text-xl
                text-slate-600 dark:text-slate-300
              "
              >
                Advanced healthcare that combines compassion and technology for
                a healthier tomorrow.
              </p>
            </div>

            {/* stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 py-4">
              {[
                { number: "500+", label: "Expert Doctors", icon: Star },
                { number: "50K+", label: "Patients", icon: CheckCircle },
                { number: "4.9", label: "Rating", icon: Sparkles },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="
                    rounded-xl p-4 text-center backdrop-blur-xl
                    bg-white/70 border border-slate-200
                    dark:bg-slate-900/60 dark:border-slate-700/60
                  "
                >
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-cyan-400">
                      {stat.number}
                    </span>
                    <stat.icon className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  </div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                className="
                inline-flex items-center gap-3 px-7 py-3 sm:px-8 sm:py-4
                rounded-xl font-bold text-white
                bg-gradient-to-r from-blue-600 to-indigo-600
                hover:shadow-xl hover:shadow-blue-500/30
                transition
              "
              >
                <Video className="w-5 h-5" />
                Book Appointment
              </button>

              <button
                className="
                inline-flex items-center gap-3 px-7 py-3 sm:px-8 sm:py-4
                rounded-xl font-bold transition
                bg-white border border-slate-300 text-slate-700
                hover:bg-slate-100
                dark:bg-slate-900/60 dark:border-slate-700 dark:text-white
              "
              >
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Diagnostic Test
                <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div
              className="
              relative rounded-3xl overflow-hidden
              bg-white/70 border border-slate-200
              dark:bg-slate-900/60 dark:border-slate-700
            "
            >
              <img
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=900&auto=format&fit=crop"
                alt="Healthcare professional"
                className="w-full h-[340px] sm:h-[420px] md:h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* floating cards desktop only */}
            <div className="hidden lg:block absolute -left-6 top-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    Verified Doctors
                  </div>
                  <div className="text-xs text-emerald-500">100% Certified</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block absolute -right-6 bottom-28 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-500" />
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    Quick Response
                  </div>
                  <div className="text-xs text-blue-500">Under 15 mins</div>
                </div>
              </div>
            </div>

            {/* bottom badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl px-6 py-3 shadow-xl">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Shield className="w-4 h-4" />
                  Trusted by 50,000+ Patients
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
