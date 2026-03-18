import React, { useState } from "react";
import { Link } from "react-router-dom";

const vehicleSpecials = [
  {
    id: 1,
    title: "0% APR for 60 Months",
    subtitle: "On select new 2024-2025 Toyota models",
    description:
      "Available on Camry, RAV4, and Corolla. With approved credit. Offer ends 03/31/2026.",
    cta: "View Eligible Vehicles",
    ctaLink: "/inventory/new",
    badge: "POPULAR",
    type: "vehicle",
  },
  {
    id: 2,
    title: "Up to $3,000 Off MSRP",
    subtitle: "On all new 2024 Chevrolet models",
    description:
      "Includes Silverado, Equinox, and Trax. Dealer discount applied at purchase.",
    cta: "Shop Chevrolet",
    ctaLink: "/inventory/new",
    badge: "LIMITED TIME",
    type: "vehicle",
  },
  {
    id: 3,
    title: "$500 Military & First Responder Discount",
    subtitle: "Extra savings for those who serve",
    description:
      "Available on any new or certified pre-owned vehicle. Valid military or first responder ID required.",
    cta: "Learn More",
    ctaLink: "/contact",
    badge: "NEW",
    type: "vehicle",
  },
  {
    id: 4,
    title: "Certified Pre-Owned Event",
    subtitle: "Save up to $2,500 on select CPO vehicles",
    description:
      "All CPO vehicles come with extended warranty and complimentary maintenance. Limited time.",
    cta: "Shop CPO",
    ctaLink: "/inventory/certified",
    badge: "LIMITED TIME",
    type: "vehicle",
  },
  {
    id: 5,
    title: "College Grad Program",
    subtitle: "$400 bonus cash on any new vehicle",
    description:
      "Recent graduates within 2 years qualify. Can be combined with other offers.",
    cta: "Get Details",
    ctaLink: "/finance",
    badge: "NEW",
    type: "vehicle",
  },
  {
    id: 6,
    title: "Trade & Save",
    subtitle: "Get an extra $1,000 for your trade-in",
    description:
      "Trade in any vehicle and receive a $1,000 bonus toward your next purchase. Limited time offer.",
    cta: "Value Your Trade",
    ctaLink: "/finance",
    badge: "POPULAR",
    type: "vehicle",
  },
];

const serviceSpecials = [
  {
    id: 7,
    title: "$10 Off Any Oil Change",
    subtitle: "Conventional or synthetic",
    description:
      "Present offer at time of service. One per customer. Expires 04/30/2026.",
    expiration: "Expires 04/30/2026",
    badge: "POPULAR",
    type: "service",
  },
  {
    id: 8,
    title: "Free Tire Rotation",
    subtitle: "With any service over $100",
    description:
      "Cannot be combined with other service offers. Expires 04/30/2026.",
    expiration: "Expires 04/30/2026",
    badge: "NEW",
    type: "service",
  },
  {
    id: 9,
    title: "15% Off Brake Service",
    subtitle: "Complete brake pad and rotor service",
    description: "Includes free brake inspection. Expires 04/30/2026.",
    expiration: "Expires 04/30/2026",
    badge: "LIMITED TIME",
    type: "service",
  },
  {
    id: 10,
    title: "$50 Off Any Service Over $500",
    subtitle: "Major service savings",
    description:
      "Valid on any service or repair totaling $500 or more. Expires 04/30/2026.",
    expiration: "Expires 04/30/2026",
    badge: "LIMITED TIME",
    type: "service",
  },
];

const allSpecials = [...vehicleSpecials, ...serviceSpecials];

const tabs = [
  { key: "all", label: "All Specials" },
  { key: "vehicle", label: "Vehicle Specials" },
  { key: "service", label: "Service Specials" },
];

const badgeColors = {
  NEW: "bg-emerald-500 text-white",
  "LIMITED TIME": "bg-red-500 text-white",
  POPULAR: "bg-blue-500 text-white",
};

export default function SpecialsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all"
      ? allSpecials
      : allSpecials.filter((s) => s.type === activeTab);

  return (
    <div>
      {/* ───────────────── Header ───────────────── */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-[#1E3A5F]">Specials & Offers</h1>
        </div>
      </div>

      {/* ───────────────── Filter Tabs + Grid ───────────────── */}
      <section className="py-16 md:py-24 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-colors ${
                  activeTab === key
                    ? "bg-navy-700 text-white"
                    : "bg-white text-navy-600 border border-gray-200 hover:bg-navy-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((special) => (
              <div
                key={special.id}
                className="bg-white rounded-2xl shadow-md border-l-4 border-gold-400 p-6 relative flex flex-col hover:shadow-lg transition-shadow"
              >
                {/* Badge */}
                {special.badge && (
                  <span
                    className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${
                      badgeColors[special.badge] || "bg-gray-500 text-white"
                    }`}
                  >
                    {special.badge}
                  </span>
                )}

                <h3 className="text-xl font-bold text-navy-700 mb-1 pr-20">
                  {special.title}
                </h3>
                <p className="text-navy-500 font-medium mb-3">{special.subtitle}</p>
                <p className="text-sm text-navy-400 leading-relaxed flex-1">
                  {special.description}
                </p>

                {special.expiration && (
                  <p className="text-xs text-navy-400 mt-3">{special.expiration}</p>
                )}

                {special.cta && special.ctaLink ? (
                  <div className="mt-5">
                    <Link
                      to={special.ctaLink}
                      className="inline-block bg-[#1E3A5F] hover:bg-[#2d4a7a] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
                    >
                      {special.cta}
                    </Link>
                  </div>
                ) : (
                  <div className="mt-5">
                    <Link
                      to="/service"
                      className="inline-block border-2 border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
                    >
                      Schedule Service
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
