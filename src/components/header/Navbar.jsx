import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Video,
  Calendar,
  Stethoscope,
  FileText,
  Sun,
  Moon,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  /* ------------------ THEME SETUP ------------------ */
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    setDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  /* ------------------ SCROLL EFFECT ------------------ */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ------------------ SERVICES ------------------ */
  const services = [
    { icon: <Video className="w-5 h-5 text-cyan-500" />, name: "Video Consultation", desc: "Connect instantly", href: "/services#video" },
    { icon: <Calendar className="w-5 h-5 text-cyan-500" />, name: "Home Visit", desc: "Doctor at doorstep", href: "/services#homevisit" },
    { icon: <FileText className="w-5 h-5 text-cyan-500" />, name: "Lab Tests", desc: "Sample collection", href: "/services#lab" },
    { icon: <Stethoscope className="w-5 h-5 text-cyan-500" />, name: "Health Checkup", desc: "Complete wellness", href: "/services#checkup" },
  ];

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services", dropdown: services },
    { name: "Doctors", href: "/doctors" },
    { name: "Booking", href: "/booking" },
    { name: "FAQ", href: "/faq" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  /* ------------------ ANIMATION VARIANTS ------------------ */
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileDropdownVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1 },
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled || isOpen
          ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl shadow-xl border-b border-slate-200 dark:border-slate-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
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
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className="px-5 py-2.5 text-sm font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 transition flex items-center gap-1"
                  aria-expanded={activeDropdown === item.name}
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* ANIMATED DROPDOWN */}
                {item.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                        className="absolute top-full mt-2 w-80"
                      >
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden">
                          {item.dropdown.map((service) => (
                            <Link
                              key={service.name}
                              to={service.href}
                              className="flex gap-3 p-4 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition"
                            >
                              {service.icon}
                              <div>
                                <p className="font-semibold text-slate-800 dark:text-white text-sm">{service.name}</p>
                                <p className="text-xs text-slate-500">{service.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link
              to="/booking"
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl flex items-center gap-1"
            >
              <Calendar className="w-4 h-4" />
              Book Now
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
            className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800"
            >
              {menuItems.map((item) => (
                <div key={item.name} className="px-4 py-2">
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    {item.name}
                  </Link>

                  {/* MOBILE DROPDOWN */}
                  {item.dropdown && (
                    <AnimatePresence>
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={mobileDropdownVariants}
                        className="pl-4 overflow-hidden"
                      >
                        {item.dropdown.map((service) => (
                          <Link
                            key={service.name}
                            to={service.href}
                            onClick={() => setIsOpen(false)}
                            className="block py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
                          >
                            {service.name}
                          </Link>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              ))}

              {/* THEME TOGGLE */}
              <button
                onClick={toggleTheme}
                className="mt-4 w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800"
              >
                Toggle {darkMode ? "Light" : "Dark"} Mode
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
