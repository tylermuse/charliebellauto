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
      <div className="bg-[#1B2A4A] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-5">
            <a
              href="tel:+15125550199"
              className="flex items-center gap-1.5 hover:text-[#D4A843] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(512) 555-0199</span>
            </a>
            <span className="hidden sm:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Mon-Fri: 9am-8pm | Sat: 9am-6pm | Sun: 12pm-5pm
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>4200 Auto Mall Parkway, Austin, TX 78745</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold tracking-tight text-[#1B2A4A]">
              CHARLIE BELL AUTO
            </span>
            <span className="text-[11px] md:text-xs text-gray-500 tracking-wide">
              Your Trusted Dealer Since 1987
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#D4A843] bg-[#1B2A4A]/5"
                      : "text-[#1B2A4A] hover:text-[#D4A843] hover:bg-gray-50"
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
            className="lg:hidden p-2 text-[#1B2A4A] hover:bg-gray-100 rounded-md"
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
                <span className="text-lg font-bold text-[#1B2A4A]">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-gray-500 hover:text-[#1B2A4A] hover:bg-gray-100 rounded-md"
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
                          ? "text-[#D4A843] bg-[#1B2A4A]/5 border-r-2 border-[#D4A843]"
                          : "text-[#1B2A4A] hover:text-[#D4A843] hover:bg-gray-50"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 space-y-2 text-sm text-gray-600">
                <a
                  href="tel:+15125550199"
                  className="flex items-center gap-2 hover:text-[#D4A843]"
                >
                  <Phone className="w-4 h-4" />
                  (512) 555-0199
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
