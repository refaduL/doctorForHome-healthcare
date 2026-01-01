import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaServicestack,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  const navLinks = [
    { name: "Home", href: "#home", icon: <FaHome /> },
    { name: "Services", href: "#services", icon: <FaServicestack /> },
    { name: "About", href: "#about", icon: <FaInfoCircle /> },
    { name: "Contact", href: "#contact", icon: <FaPhone /> },
  ];

  const toggleMenu = () => {
    if (isOpen) {
      setAnimateOut(true);
      setTimeout(() => {
        setIsOpen(false);
        setAnimateOut(false);
      }, 300);
    } else {
      setIsOpen(true);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setAnimateOut(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-secondary/50 backdrop-blur-md shadow-sm"
          : "bg-transparent shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex justify-between items-center h-16 md:h-20">
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <FaTimes size={24} className="text-gray-800" />
            ) : (
              <FaBars size={24} className="text-gray-800" />
            )}
          </button>
        </div>

        {/* Logo */}
        <div
          className={`text-2xl font-bold text-blue-700 cursor-pointer transition-all duration-300 ${
            scrolled ? "opacity-100" : "opacity-0 md:opacity-100"
          }`}
        >
          By My Startup
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {["Home", "Services", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-700 hover:text-blue-700 font-medium transition"
            >
              {item}
            </a>
          ))}
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-tl-[20px] rounded-br-[20px] transition">
            Login
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          ref={menuRef}
          className={`md:hidden absolute top-18 left-0 w-full z-40 ${
            animateOut ? "animate-slideUp" : "animate-slideDown"
          }`}
        >
          <div className="bg-secondary backdrop-blur-md shadow-xl rounded-b-3xl border-t border-gray-200 py-5 flex flex-col items-center animate-fadeIn">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => toggleMenu()}
                className="flex items-center gap-3 justify-center text-gray-800 font-semibold text-lg tracking-wide hover:text-blue-700 transition-transform duration-200 transform hover:scale-105 w-full text-center py-3 relative"
              >
                {link.icon}
                {link.name}
                {index !== navLinks.length - 1 && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                )}
              </a>
            ))}
            <button className="bg-blue-700 hover:bg-blue-800 text-white w-[80%] py-3 mt-4 rounded-tl-[20px] rounded-br-[20px] shadow-md hover:shadow-lg transition-all">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
