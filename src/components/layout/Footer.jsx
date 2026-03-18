import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Inventory", to: "/inventory" },
  { label: "Finance", to: "/finance" },
  { label: "Specials", to: "/specials" },
];

const serviceLinks = [
  { label: "Service Center", to: "/service" },
  { label: "Parts", to: "/service" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/charliebellauto", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/charliebellauto", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/charliebellautotx", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com/@charliebellauto", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1E3A5F] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Brand / Description — full width */}
        <div className="mb-10">
          <Link to="/" className="inline-block">
            <h3 className="text-xl font-bold text-white tracking-tight font-display">
              CHARLIE BELL AUTO
            </h3>
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-gray-400 max-w-xl">
            Serving the Austin community with quality new and pre-owned
            vehicles since 1987. Your satisfaction is our top priority.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C45D3E] transition-colors"
              >
                <Icon className="w-4 h-4 text-white" />
              </a>
            ))}
          </div>
        </div>

        {/* 3-column link grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm hover:text-[#C45D3E] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm hover:text-[#C45D3E] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#C45D3E]" />
                <span>9831 S Congress Ave, Austin, TX 78745</span>
              </li>
              <li>
                <a
                  href="tel:+15128473261"
                  className="flex items-center gap-2.5 hover:text-[#C45D3E] transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0 text-[#C45D3E]" />
                  (512) 847-3261
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@charliebellauto.com"
                  className="flex items-center gap-2.5 hover:text-[#C45D3E] transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0 text-[#C45D3E]" />
                  info@charliebellauto.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-[#C45D3E]" />
                <div>
                  <p>Mon-Fri: 9am-8pm</p>
                  <p>Sat: 9am-6pm</p>
                  <p>Sun: 12pm-5pm</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <span>&copy; 2026 Charlie Bell Auto. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-[#C45D3E] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#C45D3E] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-5 text-xs text-gray-500 text-center">
          Charlie Bell Auto is not responsible for typographical errors. All prices plus TT&amp;L. See dealer for details.
        </div>
      </div>
    </footer>
  );
}
