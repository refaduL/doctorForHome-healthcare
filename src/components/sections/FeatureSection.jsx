import React from 'react';
import { Video, Home, Pill, HeartPulse, Clock, Shield, Smartphone, Users, FileText } from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: <Video className="w-7 h-7" />,
      title: "Virtual Consultations",
      desc: "Connect with specialists instantly through secure HD video calls from anywhere.",
      gradient: "from-cyan-500 to-blue-600",
      bgGlow: "bg-cyan-500/10",
      iconBg: "from-cyan-400 to-blue-500"
    },
    {
      icon: <Home className="w-7 h-7" />,
      title: "Home Healthcare",
      desc: "Professional medical care delivered to your doorstep with certified nurses.",
      gradient: "from-emerald-500 to-teal-600",
      bgGlow: "bg-emerald-500/10",
      iconBg: "from-emerald-400 to-teal-500"
    },
    {
      icon: <Pill className="w-7 h-7" />,
      title: "E-Prescription",
      desc: "Digital prescriptions sent directly to your pharmacy with medication reminders.",
      gradient: "from-purple-500 to-indigo-600",
      bgGlow: "bg-purple-500/10",
      iconBg: "from-purple-400 to-indigo-500"
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "24/7 Availability",
      desc: "Round-the-clock access to medical professionals whenever you need support.",
      gradient: "from-orange-500 to-amber-600",
      bgGlow: "bg-orange-500/10",
      iconBg: "from-orange-400 to-amber-500"
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "HIPAA Compliant",
      desc: "Military-grade encryption ensures your health data stays private and secure.",
      gradient: "from-blue-500 to-indigo-600",
      bgGlow: "bg-blue-500/10",
      iconBg: "from-blue-400 to-indigo-500"
    },
    // {
    //   icon: <HeartPulse className="w-7 h-7" />,
    //   title: "Remote Monitoring",
    //   desc: "Track vital signs in real-time with smart devices and AI-powered health alerts.",
    //   gradient: "from-pink-500 to-rose-600",
    //   bgGlow: "bg-pink-500/10",
    //   iconBg: "from-pink-400 to-rose-500"
    // },
    // {
    //   icon: <Smartphone className="w-7 h-7" />,
    //   title: "Mobile App Access",
    //   desc: "Manage appointments, records, and consultations seamlessly on any device.",
    //   gradient: "from-violet-500 to-purple-600",
    //   bgGlow: "bg-violet-500/10",
    //   iconBg: "from-violet-400 to-purple-500"
    // },
    // {
    //   icon: <Users className="w-7 h-7" />,
    //   title: "Family Health Hub",
    //   desc: "One platform to manage healthcare for your entire family with shared access.",
    //   gradient: "from-fuchsia-500 to-pink-600",
    //   bgGlow: "bg-fuchsia-500/10",
    //   iconBg: "from-fuchsia-400 to-pink-500"
    // },
    {
      icon: <FileText className="w-7 h-7" />,
      title: "Digital Health Records",
      desc: "Access your complete medical history instantly from anywhere, anytime.",
      gradient: "from-teal-500 to-cyan-600",
      bgGlow: "bg-teal-500/10",
      iconBg: "from-teal-400 to-cyan-500"
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full mb-6 backdrop-blur-sm">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-300 text-sm font-semibold tracking-wider uppercase">
              Platform Features
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Healthcare reimagined
            </span>
            <br />
            <span className="text-white">
              for digital age
            </span>
          </h2>
          
          <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Experience next-generation telemedicine with cutting-edge technology that puts 
            you in control of your health journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative"
            >
              {/* Glow Effect on Hover */}
              <div className={`absolute -inset-0.5 ${feature.bgGlow} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Card */}
              <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-slate-600/80 group-hover:-translate-y-2">
                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>

                {/* Animated Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden rounded-tr-3xl">
                  <div className={`absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-full transition-all duration-500`}></div>
                </div>

                {/* Bottom Gradient Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-400 mb-6">
            Ready to experience the future of healthcare?
          </p>
          <button className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl font-bold text-white text-base overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
            
            <span className="relative z-10">Start Your Journey</span>
            <div className="relative z-10 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
    </section>
  );
};

export default FeatureSection;