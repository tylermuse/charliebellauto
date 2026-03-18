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
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1B2A4A] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - Brand */}
          <div>
            <Link to="/" className="inline-block">
              <h3 className="text-xl font-bold text-white tracking-tight">
                CHARLIE BELL AUTO
              </h3>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Serving the Austin community with quality new and pre-owned
              vehicles since 1987. Your satisfaction is our top priority.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#D4A843] transition-colors"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm hover:text-[#D4A843] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm hover:text-[#D4A843] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#D4A843]" />
                <span>4200 Auto Mall Parkway, Austin, TX 78745</span>
              </li>
              <li>
                <a
                  href="tel:+15125550199"
                  className="flex items-center gap-2.5 hover:text-[#D4A843] transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0 text-[#D4A843]" />
                  (512) 555-0199
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@charliebellauto.com"
                  className="flex items-center gap-2.5 hover:text-[#D4A843] transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0 text-[#D4A843]" />
                  info@charliebellauto.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-[#D4A843]" />
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
          <span>&copy; 2025 Charlie Bell Auto. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-[#D4A843] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#D4A843] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
