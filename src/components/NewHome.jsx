import React from 'react';
import { Video, Calendar, Shield, Zap, Sparkles, ArrowRight, CheckCircle, Clock, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 overflow-hidden flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content Card */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-full backdrop-blur-sm">
              <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-emerald-300 text-sm font-semibold">
                Available 24/7 • Emergency Care
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-black leading-tight">
                <span className="text-white block">CARE.</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 block">
                  EXCELLENCE.
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 block">
                  FUTURE.
                </span>
              </h1>
              
              <p className="text-slate-300 text-xl leading-relaxed max-w-xl">
                Advanced healthcare that combines compassion and technology for a healthier tomorrow.
              </p>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-6 py-6">
              {[
                { number: '500+', label: 'Expert Doctors', icon: <Star className="w-4 h-4" /> },
                { number: '50K+', label: 'Happy Patients', icon: <CheckCircle className="w-4 h-4" /> },
                { number: '4.9', label: 'Rating', icon: <Sparkles className="w-4 h-4" /> }
              ].map((stat, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 text-center transition-all duration-300 group-hover:border-cyan-500/50">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                        {stat.number}
                      </span>
                      <span className="text-cyan-400">{stat.icon}</span>
                    </div>
                    <div className="text-slate-400 text-xs font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                <Video className="relative z-10 w-5 h-5" />
                <span className="relative z-10">Book Appointment</span>
              </button>

              <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-900/50 backdrop-blur-xl border-2 border-slate-700 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/30">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span>Book Diagnostic Test</span>
                <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Right Image Card */}
          <div className="relative">
            {/* Main Image Card */}
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              
              {/* Image Container */}
              <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-3 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&auto=format&fit=crop"
                  alt="Healthcare professional"
                  className="w-full h-[600px] object-cover rounded-2xl"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-3 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
              </div>
            </div>

            {/* Floating Info Cards */}
            {/* Top Left Card */}
            <div className="absolute -left-6 top-20 group">
              <div className="absolute inset-0 bg-emerald-500/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl transition-all duration-300 group-hover:border-emerald-500/50 group-hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Verified Doctors</div>
                    <div className="text-xs text-emerald-400">100% Certified</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Right Card */}
            <div className="absolute -right-6 bottom-32 group">
              <div className="absolute inset-0 bg-cyan-500/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl transition-all duration-300 group-hover:border-cyan-500/50 group-hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Quick Response</div>
                    <div className="text-xs text-cyan-400">Under 15 mins</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Badge */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 group">
              <div className="absolute inset-0 bg-purple-500/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-2xl transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-white" />
                  <span className="text-white font-bold">Trusted by 50,000+ Patients</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
    </section>
  );
};

export default HeroSection;