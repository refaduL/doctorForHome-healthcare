import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, Video, Calendar, Stethoscope, FileText, Sparkles, Sun, Moon } from 'lucide-react';

const Navbar = () => {   
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  /* ------------------ THEME SETUP ------------------ */
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light') {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    } 
    // else {
    //   document.documentElement.classList.add('dark');
    // }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setDarkMode(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  /* ------------------ SCROLL ------------------ */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
    { name: 'Services', href: '#services', dropdown: services },
    { name: 'Doctors', href: '#doctors' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500
      ${scrolled || isOpen
        ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl shadow-xl border-b border-slate-200 dark:border-slate-800/50'
        : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">

          {/* LOGO */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-lg opacity-50"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">
                DoctorsForHome
              </h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 tracking-wider">
                HEALTHCARE REIMAGINED
              </p>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map(item => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="px-5 py-2.5 text-sm font-semibold rounded-xl
                  text-slate-700 dark:text-slate-300
                  hover:text-black dark:hover:text-white
                  hover:bg-slate-100 dark:hover:bg-slate-800/50 transition"
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="inline w-4 h-4 ml-1" />}
                </a>

                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full mt-2 w-80">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden">
                      {item.dropdown.map((service, i) => (
                        <a
                          key={i}
                          href="#"
                          className="flex gap-3 p-4 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition"
                        >
                          <div className="text-cyan-500">{service.icon}</div>
                          <div>
                            <p className="font-semibold text-slate-800 dark:text-white text-sm">
                              {service.name}
                            </p>
                            <p className="text-xs text-slate-500">{service.desc}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl flex items-center justify-center
              bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl">
              <Calendar className="inline w-4 h-4 mr-1" /> Book Now
            </button>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden py-6 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
            {menuItems.map(item => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {item.name}
              </a>
            ))}

            <button
              onClick={toggleTheme}
              className="mt-4 w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800"
            >
              Toggle {darkMode ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
