import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Gauge,
  Cog,
  Settings,
  Zap,
  Fuel,
  Palette,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Home,
  ShieldCheck,
  Calendar,
  DollarSign,
  Car,
} from "lucide-react";
import { vehicles } from "../data/inventory";
import VehicleImage from "../components/VehicleImage";

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

function calculateMonthly(price, months = 72, apr = 6.9) {
  const r = apr / 100 / 12;
  return Math.round((price * r) / (1 - Math.pow(1 + r, -months)));
}

const GALLERY_LABELS = ["Front View", "Front 3/4", "Side View", "Rear 3/4", "Rear View", "Interior"];

function conditionLabel(vehicle) {
  if (vehicle.condition === "certified") return "Certified Pre-Owned";
  return vehicle.condition === "new" ? "New" : "Used";
}

function conditionColor(vehicle) {
  if (vehicle.condition === "new") return "bg-green-600";
  if (vehicle.condition === "certified") return "bg-blue-600";
  return "bg-gray-600";
}

function conditionPath(vehicle) {
  if (vehicle.condition === "certified") return "/inventory/certified";
  return `/inventory/${vehicle.condition}`;
}

/* ---------- Lead Form Card (accordion) ---------- */
function LeadFormCard({ title, icon: Icon, defaultOpen, fields }) {
  const [open, setOpen] = useState(defaultOpen);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-2 font-semibold text-navy-700">
          <Icon className="w-5 h-5" />
          {title}
        </span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 bg-white">
          {submitted ? (
            <div className="flex items-center gap-2 text-green-700 bg-green-50 rounded-lg p-4 text-sm">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              Thank you! A member of our team will contact you shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {fields.map((f) => {
                if (f.type === "select") {
                  return (
                    <select
                      key={f.name}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                    >
                      <option value="">{f.placeholder}</option>
                      {f.options.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  );
                }
                return (
                  <input
                    key={f.name}
                    type={f.type || "text"}
                    placeholder={f.placeholder}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                );
              })}
              <button
                type="submit"
                className="w-full py-3 bg-gold-400 hover:bg-gold-500 text-white font-semibold rounded-lg transition-colors"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- Similar Vehicle Card ---------- */
function SimilarCard({ v }) {
  const title = `${v.year} ${v.make} ${v.model} ${v.trim}`;
  return (
    <Link
      to={`/inventory/${v.id}`}
      className="min-w-[260px] max-w-xs flex-shrink-0 rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white"
    >
      <VehicleImage vehicle={v} />
      <div className="p-4">
        <h4 className="font-semibold text-navy-700 text-sm truncate">
          {title}
        </h4>
        <p className="text-gold-500 font-bold mt-1">
          ${v.price.toLocaleString()}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {v.mileage.toLocaleString()} mi &middot; {v.drivetrain}
        </p>
      </div>
    </Link>
  );
}

/* ========== MAIN COMPONENT ========== */
export default function VehicleDetailPage() {
  const { id } = useParams();
  const vehicle = vehicles.find((v) => v.id === id);

  const [selectedThumb, setSelectedThumb] = useState(0);
  const [openForm, setOpenForm] = useState(0); // not used directly — each card manages its own

  const similar = useMemo(() => {
    if (!vehicle) return [];
    const sameBody = vehicles.filter(
      (v) => v.bodyStyle === vehicle.bodyStyle && v.id !== vehicle.id
    );
    if (sameBody.length >= 4) return sameBody.slice(0, 4);
    const sameMake = vehicles.filter(
      (v) => v.make === vehicle.make && v.id !== vehicle.id
    );
    const combined = [...sameBody];
    for (const v of sameMake) {
      if (!combined.find((c) => c.id === v.id)) combined.push(v);
      if (combined.length >= 4) break;
    }
    return combined.slice(0, 4);
  }, [vehicle]);

  /* ---------- Not Found ---------- */
  if (!vehicle) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h1 className="text-4xl font-bold text-navy-700">
          Vehicle Not Found
        </h1>
        <p className="mt-3 text-gray-500 max-w-md">
          Sorry, we couldn&rsquo;t find the vehicle you&rsquo;re looking for. It
          may have been sold or removed from our inventory.
        </p>
        <Link
          to="/inventory"
          className="mt-8 inline-flex items-center px-6 py-3 bg-gold-400 text-white font-medium rounded-lg hover:bg-gold-500 transition-colors"
        >
          Browse Inventory
        </Link>
      </div>
    );
  }

  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`;
  const monthly = calculateMonthly(vehicle.price);
  const hasSavings = vehicle.msrp > vehicle.price;
  const isUsedOrCert =
    vehicle.condition === "used" || vehicle.condition === "certified";

  /* Detail table rows */
  const detailRows = [
    ["Year", vehicle.year],
    ["Make", vehicle.make],
    ["Model", vehicle.model],
    ["Trim", vehicle.trim],
    ["Body Style", vehicle.bodyStyle],
    ["Engine", vehicle.engine],
    ["Transmission", vehicle.transmission],
    ["Drivetrain", vehicle.drivetrain],
    ["Fuel Type", vehicle.fuelType],
    ["Exterior Color", vehicle.exteriorColor],
    ["Interior Color", vehicle.interiorColor],
    ["VIN", vehicle.vin],
    ["Stock Number", vehicle.stockNumber],
  ];

  /* Spec bar items */
  const specs = [
    {
      icon: Gauge,
      value: `${vehicle.mileage.toLocaleString()} mi`,
    },
    { icon: Cog, value: vehicle.drivetrain },
    { icon: Settings, value: vehicle.transmission },
    { icon: Zap, value: vehicle.engine },
    {
      icon: Fuel,
      value: `${vehicle.mpgCity} city / ${vehicle.mpgHighway} hwy`,
    },
    { icon: Palette, value: vehicle.exteriorColor, label: "Ext" },
    { icon: Palette, value: vehicle.interiorColor, label: "Int" },
  ];

  const handlePrev = () =>
    setSelectedThumb((p) => (p === 0 ? GALLERY_LABELS.length - 1 : p - 1));
  const handleNext = () =>
    setSelectedThumb((p) => (p === GALLERY_LABELS.length - 1 ? 0 : p + 1));

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Breadcrumbs */}
      <motion.nav variants={fade} className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
        <Link to="/" className="hover:text-navy-700 flex items-center gap-1">
          <Home className="w-4 h-4" /> Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/inventory" className="hover:text-navy-700">
          Inventory
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={conditionPath(vehicle)} className="hover:text-navy-700 capitalize">
          {conditionLabel(vehicle)}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-navy-700 font-medium">{title}</span>
      </motion.nav>

      {/* Title (mobile) */}
      <motion.h1
        variants={fade}
        className="text-2xl sm:text-3xl font-bold text-navy-700 mb-4 lg:hidden"
      >
        {title}
      </motion.h1>

      {/* ===== Photo Gallery ===== */}
      <motion.div variants={fade} className="mb-6">
        {/* Main Image */}
        <div className="relative rounded-xl overflow-hidden group">
          <VehicleImage vehicle={vehicle} aspect="aspect-[16/9]" />

          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-navy-700" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-navy-700" />
          </button>

          {/* View label */}
          <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
            {GALLERY_LABELS[selectedThumb]}
          </span>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {GALLERY_LABELS.map((label, i) => (
            <button
              key={i}
              onClick={() => setSelectedThumb(i)}
              className={`flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedThumb === i
                  ? "border-gold-400"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <VehicleImage vehicle={vehicle} aspect="w-full h-full" />
            </button>
          ))}
        </div>
      </motion.div>

      {/* ===== Key Specs Bar ===== */}
      <motion.div
        variants={fade}
        className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 bg-navy-50 rounded-xl p-4 mb-8"
      >
        {specs.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="flex items-center gap-2 text-sm">
              <Icon className="w-4 h-4 text-navy-600 flex-shrink-0" />
              <span className="text-navy-800 truncate">
                {s.label ? `${s.label}: ${s.value}` : s.value}
              </span>
            </div>
          );
        })}
      </motion.div>

      {/* ===== Two Column Layout ===== */}
      <div className="lg:grid lg:grid-cols-5 lg:gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-3 space-y-8">
          {/* Title (desktop) */}
          <motion.h1
            variants={fade}
            className="hidden lg:block text-3xl font-bold text-navy-700"
          >
            {title}
          </motion.h1>

          {/* Price Block */}
          <motion.div
            variants={fade}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-baseline gap-3">
              {hasSavings && (
                <span className="text-lg text-gray-400 line-through">
                  MSRP ${vehicle.msrp.toLocaleString()}
                </span>
              )}
              <span className="text-3xl font-bold text-navy-700">
                ${vehicle.price.toLocaleString()}
              </span>
              {hasSavings && (
                <span className="text-sm font-medium text-green-600">
                  Save ${(vehicle.msrp - vehicle.price).toLocaleString()}
                </span>
              )}
            </div>

            <p className="mt-2 text-lg font-semibold text-gold-500">
              Est. ${monthly.toLocaleString()}/mo
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Est. payment based on 72 mo, 6.9% APR. Actual terms may vary.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-1 mt-4 text-xs text-gray-500">
              <span>Stock # {vehicle.stockNumber}</span>
              <span>VIN {vehicle.vin}</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div variants={fade} className="space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-navy-700">
                Vehicle Description
              </h2>
              <span
                className={`text-xs text-white px-3 py-1 rounded-full font-medium ${conditionColor(vehicle)}`}
              >
                {conditionLabel(vehicle)}
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {vehicle.description}
            </p>
          </motion.div>

          {/* Features */}
          {vehicle.features && vehicle.features.length > 0 && (
            <motion.div variants={fade}>
              <h2 className="text-xl font-bold text-navy-700 mb-4">
                Features &amp; Equipment
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {vehicle.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Details Table */}
          <motion.div variants={fade}>
            <h2 className="text-xl font-bold text-navy-700 mb-4">
              Vehicle Details
            </h2>
            <div className="rounded-xl overflow-hidden border border-gray-200">
              {detailRows.map(([label, value], i) => (
                <div
                  key={label}
                  className={`flex justify-between px-5 py-3 text-sm ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <span className="font-medium text-gray-600">{label}</span>
                  <span className="text-navy-700 text-right">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 mt-8 lg:mt-0 space-y-4">
          {/* Lead Form Cards */}
          <motion.div variants={fade} className="space-y-4 sticky top-4">
            <LeadFormCard
              title="Check Availability"
              icon={Car}
              defaultOpen={true}
              fields={[
                { name: "name", placeholder: "Full Name" },
                { name: "email", type: "email", placeholder: "Email Address" },
                { name: "phone", type: "tel", placeholder: "Phone Number" },
              ]}
            />

            <LeadFormCard
              title="Schedule a Test Drive"
              icon={Calendar}
              defaultOpen={false}
              fields={[
                { name: "name", placeholder: "Full Name" },
                { name: "email", type: "email", placeholder: "Email Address" },
                { name: "phone", type: "tel", placeholder: "Phone Number" },
                {
                  name: "date",
                  type: "date",
                  placeholder: "Preferred Date",
                },
              ]}
            />

            <LeadFormCard
              title="Get a Financing Quote"
              icon={DollarSign}
              defaultOpen={false}
              fields={[
                { name: "name", placeholder: "Full Name" },
                { name: "email", type: "email", placeholder: "Email Address" },
                { name: "phone", type: "tel", placeholder: "Phone Number" },
                {
                  name: "credit",
                  type: "select",
                  placeholder: "Select Credit Score Range",
                  options: [
                    "Excellent (750+)",
                    "Good (700-749)",
                    "Fair (650-699)",
                    "Below Average (600-649)",
                    "Rebuilding (Below 600)",
                  ],
                },
              ]}
            />

            {/* CARFAX Badge (used/certified only) */}
            {isUsedOrCert && (
              <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="w-8 h-8 text-navy-700" />
                  <div>
                    <h3 className="font-bold text-navy-700 text-sm">
                      CARFAX Vehicle History Report
                    </h3>
                    <p className="text-xs text-gray-500">
                      Powered by CARFAX
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 rounded-lg px-4 py-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  No Accidents Reported
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ===== Similar Vehicles ===== */}
      {similar.length > 0 && (
        <motion.div variants={fade} className="mt-16">
          <h2 className="text-2xl font-bold text-navy-700 mb-6">
            You May Also Like
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
            {similar.map((v) => (
              <SimilarCard key={v.id} v={v} />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
