import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, Video, Calendar, Stethoscope, FileText, Users, Building, Mail, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    if (scrolled && isOpen) setIsOpen(false);
  }, [scrolled, isOpen]);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { icon: <Video className="w-4 h-4" />, name: 'Video Consultation', desc: 'Connect instantly' },
    { icon: <Calendar className="w-4 h-4" />, name: 'Home Visit', desc: 'Doctor at doorstep' },
    { icon: <FileText className="w-4 h-4" />, name: 'Lab Tests', desc: 'Sample collection' },
    { icon: <Stethoscope className="w-4 h-4" />, name: 'Health Checkup', desc: 'Complete wellness' }
  ];

  const menuItems = [
    { name: 'Home', href: '#home' },
    { 
      name: 'Services', 
      href: '#services',
      dropdown: services
    },
    { name: 'Doctors', href: '#doctors' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${
      scrolled || isOpen
        ? 'bg-slate-950/95 backdrop-blur-2xl shadow-2xl shadow-cyan-500/10 border-b border-slate-800/50'
        : 'bg-transparent'
    }`}>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              {/* Icon container */}
              <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                DoctorForHome
              </h1>
              <p className="text-[10px] text-slate-400 font-medium tracking-wider">HEALTHCARE REIMAGINED</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <div 
                key={item.name} 
                className="relative group"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a 
                  href={item.href}
                  className="flex items-center gap-1 px-5 py-2.5 text-slate-300 hover:text-white font-semibold text-sm transition-all duration-300 rounded-xl hover:bg-slate-800/50 group"
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                  <span className="absolute bottom-0 left-5 right-5 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>

                {/* Mega Dropdown */}
                {item.dropdown && (
                  <div className={`absolute top-full left-0 mt-2 w-80 transition-all duration-300 ${
                    activeDropdown === item.name 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-2'
                  }`}>
                    {/* Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                    
                    {/* Dropdown Container */}
                    <div className="relative bg-slate-900/95 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                      <div className="p-2">
                        {item.dropdown.map((service, idx) => (
                          <a
                            key={idx}
                            href="#"
                            className="flex items-start gap-3 p-4 rounded-xl hover:bg-slate-800/50 transition-all duration-300 group/item"
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-cyan-400 group-hover/item:scale-110 transition-transform duration-300">
                              {service.icon}
                            </div>
                            <div className="flex-1">
                              <div className="text-white font-semibold text-sm mb-0.5 group-hover/item:text-cyan-400 transition-colors duration-300">
                                {service.name}
                              </div>
                              <div className="text-slate-400 text-xs">
                                {service.desc}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                      
                      {/* Bottom gradient */}
                      <div className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Emergency Button */}
            <button className="group flex items-center gap-2 px-5 py-2.5 text-slate-300 hover:text-white font-semibold rounded-xl hover:bg-slate-800/50 transition-all duration-300">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <Phone className="w-4 h-4" />
              <span className="text-sm">Emergency</span>
            </button>

            {/* Book Now Button */}
            <button className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl font-bold text-white text-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105">
              {/* Button glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
              
              <Calendar className="relative z-10 w-4 h-4" />
              <span className="relative z-10">Book Now</span>
              <Sparkles className="relative z-10 w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all duration-300"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-6 border-t border-slate-800/50 ">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <div key={item.name}>
                  <a 
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white font-semibold rounded-xl hover:bg-slate-800/50 transition-all duration-300"
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                  </a>
                  
                  {item.dropdown && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.dropdown.map((service, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className="flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:text-cyan-400 text-sm rounded-lg hover:bg-slate-800/30 transition-all duration-300"
                        >
                          {service.icon}
                          <span>{service.name}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="mt-6 space-y-3">
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 text-slate-300 font-semibold rounded-xl bg-slate-800/50 border border-slate-700/50">
                <Phone className="w-4 h-4" />
                Emergency Call
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl">
                <Calendar className="w-4 h-4" />
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;