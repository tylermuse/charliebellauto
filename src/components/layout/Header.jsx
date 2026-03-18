import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Phone, Clock, MapPin, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "New Vehicles", to: "/inventory/new" },
  { label: "Used Vehicles", to: "/inventory/used" },
  { label: "Certified Pre-Owned", to: "/inventory/certified" },
  { label: "Finance", to: "/finance" },
  { label: "Service", to: "/service" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      {/* Utility Bar */}
      <div className="bg-[#1E3A5F] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-5">
            <a
              href="tel:+15128473261"
              className="flex items-center gap-1.5 hover:text-[#C45D3E] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(512) 847-3261</span>
            </a>
            <span className="hidden sm:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Mon-Fri: 9am-8pm | Sat: 9am-6pm | Sun: 12pm-5pm
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>9831 S Congress Ave, Austin, TX 78745</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <svg viewBox="0 0 40 44" className="h-10 w-9 flex-shrink-0" fill="none">
              <rect x="1" y="1" width="38" height="42" rx="6" stroke="#1E3A5F" strokeWidth="2" fill="#1E3A5F" />
              <text x="20" y="30" textAnchor="middle" fill="white" fontSize="18" fontWeight="700" fontFamily="Inter, sans-serif">CB</text>
            </svg>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-[#1E3A5F] font-display">
                CHARLIE BELL AUTO
              </span>
              <span className="text-[11px] md:text-xs text-gray-500 tracking-wide">
                Your Trusted Dealer Since 1987
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `nav-link-underline px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#C45D3E] font-semibold"
                      : "text-[#1E3A5F] hover:text-[#C45D3E]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-[#1E3A5F] hover:bg-gray-100 rounded-md"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <span className="text-lg font-bold text-[#1E3A5F]">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-gray-500 hover:text-[#1E3A5F] hover:bg-gray-100 rounded-md"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col py-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `px-6 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? "text-[#C45D3E] bg-[#1E3A5F]/5 border-r-2 border-[#C45D3E]"
                          : "text-[#1E3A5F] hover:text-[#C45D3E] hover:bg-gray-50"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 space-y-2 text-sm text-gray-600">
                <a
                  href="tel:+15128473261"
                  className="flex items-center gap-2 hover:text-[#C45D3E]"
                >
                  <Phone className="w-4 h-4" />
                  (512) 847-3261
                </a>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Mon-Fri: 9am-8pm
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
