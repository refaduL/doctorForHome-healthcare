import React from 'react';
import { Stethoscope, Heart, Users, Shield, Sparkles, TrendingUp } from 'lucide-react';

const AboutUs = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Experienced Care Team",
      desc: "Our caregivers combine expertise with compassion, ensuring every patient feels valued and safe.",
      gradient: "from-cyan-500 to-blue-500",
      bgGlow: "bg-cyan-500/10",
      iconBg: "from-cyan-400 to-blue-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Personalized Care Plans",
      desc: "We tailor every care plan to match each patient's medical and emotional needs.",
      gradient: "from-pink-500 to-rose-500",
      bgGlow: "bg-pink-500/10",
      iconBg: "from-pink-400 to-rose-500"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Holistic Well-Being",
      desc: "From nutrition to emotional support, we promote all-round well-being.",
      gradient: "from-purple-500 to-indigo-500",
      bgGlow: "bg-purple-500/10",
      iconBg: "from-purple-400 to-indigo-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe & Comfortable Environment",
      desc: "Clean, calm, and technologically advanced facilities for your peace of mind.",
      gradient: "from-emerald-500 to-teal-500",
      bgGlow: "bg-emerald-500/10",
      iconBg: "from-emerald-400 to-teal-500"
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-semibold tracking-wider uppercase">
              Who We Are
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Care that respects,
            </span>
            <br />
            <span className="text-white">
              comforts, and supports
            </span>
          </h2>
          
          <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
            We believe in more than treatment — we deliver comfort, confidence,
            and care that truly matters.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-0.5 ${feature.bgGlow} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Card */}
              <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-slate-600/80 group-hover:-translate-y-2">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
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

                {/* Decorative Corner */}
                <div className={`absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="group relative inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl font-bold text-white text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105">
            {/* Button Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
            
            <span className="relative z-10">Know More</span>
            <TrendingUp className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
    </section>
  );
};

export default AboutUs;