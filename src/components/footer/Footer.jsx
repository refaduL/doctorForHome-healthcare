import React from 'react';
import { Stethoscope, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Careers', href: '#careers' }
  ];

  const services = [
    { name: 'Video Consultation', href: '#' },
    { name: 'Home Visit', href: '#' },
    { name: 'Lab Tests', href: '#' },
    { name: 'Health Checkup', href: '#' }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-4 h-4" />, href: '#', color: 'hover:bg-blue-500' },
    { icon: <Twitter className="w-4 h-4" />, href: '#', color: 'hover:bg-sky-500' },
    { icon: <Instagram className="w-4 h-4" />, href: '#', color: 'hover:bg-pink-500' },
    { icon: <Linkedin className="w-4 h-4" />, href: '#', color: 'hover:bg-blue-600' }
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/50 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b from-cyan-500/5 to-transparent blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  DoctorForHome
                </h3>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Revolutionizing healthcare with technology and compassion for a healthier tomorrow.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className={`w-9 h-9 flex items-center justify-center bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-400 transition-all duration-300 ${social.color} hover:text-white hover:border-transparent hover:scale-110`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full"></div>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-cyan-400 transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-cyan-400 group-hover:w-3 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((service, idx) => (
                <li key={idx}>
                  <a
                    href={service.href}
                    className="text-slate-400 text-sm hover:text-purple-400 transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-purple-400 group-hover:w-3 transition-all duration-300"></span>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></div>
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-start gap-3 text-slate-400 text-sm hover:text-pink-400 transition-colors duration-300 group"
                >
                  <Phone className="w-4 h-4 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span>+880 1628495554</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@doctorforhome.com"
                  className="flex items-start gap-3 text-slate-400 text-sm hover:text-pink-400 transition-colors duration-300 group"
                >
                  <Mail className="w-4 h-4 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span>info@doctorsforhome.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-slate-400 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Takwa Chowdhury plaza, Nowa bazar bishwo road mor, PC road Halishahar Chottogram.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-slate-500 text-sm text-center md:text-left">
              © 2026 DoctorForHome. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      <div>
        <img src="/ssl-commerz.png" alt="payment gateway image" />
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
    </footer>
  );
};

export default Footer;