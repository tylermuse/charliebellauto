import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { vehicles } from "../data/inventory";
import VehicleImage from "../components/VehicleImage";

const ITEMS_PER_PAGE = 12;

const MILEAGE_OPTIONS = [
  { label: "Under 10,000", value: 10000 },
  { label: "Under 25,000", value: 25000 },
  { label: "Under 50,000", value: 50000 },
  { label: "Under 75,000", value: 75000 },
  { label: "Under 100,000", value: 100000 },
];

const BODY_STYLES = ["Sedan", "SUV", "Truck", "Coupe"];
const DRIVETRAINS = ["FWD", "RWD", "AWD", "4WD"];
const FUEL_TYPES = ["Gasoline", "Hybrid", "Electric"];
const CONDITIONS = [
  { value: "new", label: "New" },
  { value: "used", label: "Used" },
  { value: "certified", label: "Certified Pre-Owned" },
];

const SORT_OPTIONS = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "mileage-asc", label: "Mileage: Low to High" },
  { value: "year-desc", label: "Year: Newest" },
  { value: "days-asc", label: "Recently Added" },
];

const CONDITION_BADGE = {
  new: "bg-green-600",
  used: "bg-blue-600",
  certified: "bg-purple-600",
};

const CONDITION_LABEL = {
  new: "New",
  used: "Used",
  certified: "Certified Pre-Owned",
};

function formatPrice(num) {
  return "$" + num.toLocaleString("en-US");
}

function formatMileage(num) {
  return num.toLocaleString("en-US") + " mi";
}

// ─── Collapsible filter section ────────────────────────────────────────────
function FilterSection({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200 py-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#1E3A5F]"
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className="mt-2 space-y-1">{children}</div>}
    </div>
  );
}

// ─── Checkbox helper ───────────────────────────────────────────────────────
function CheckboxGroup({ options, selected, onChange }) {
  return options.map((opt) => {
    const value = typeof opt === "string" ? opt : opt.value;
    const label = typeof opt === "string" ? opt : opt.label;
    const checked = selected.includes(value);
    return (
      <label
        key={value}
        className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {
            onChange(
              checked ? selected.filter((s) => s !== value) : [...selected, value]
            );
          }}
          className="h-4 w-4 rounded border-gray-300 text-[#1E3A5F] focus:ring-[#1E3A5F]"
        />
        {label}
      </label>
    );
  });
}

// ─── Check Availability Modal ──────────────────────────────────────────────
function AvailabilityModal({ vehicle, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onClose, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h3 className="mb-1 text-lg font-bold text-[#1E3A5F]">Check Availability</h3>
        <p className="mb-4 text-sm text-gray-500">
          {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
        </p>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-gray-800">Thank you!</p>
            <p className="text-sm text-gray-500">We'll be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              required
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1E3A5F] focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
            />
            <input
              required
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1E3A5F] focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1E3A5F] focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
            />
            <textarea
              placeholder="Message (optional)"
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1E3A5F] focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-[#1E3A5F] py-2.5 text-sm font-semibold text-white transition hover:bg-[#162240]"
            >
              Submit Inquiry
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

// ─── Vehicle Card ──────────────────────────────────────────────────────────
function VehicleCard({ vehicle, index, view, onCheckAvailability }) {

  if (view === "list") {
    return (
      <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
        {/* Image */}
        <div className="relative w-56 shrink-0">
          <VehicleImage vehicle={vehicle} aspect="aspect-auto h-full" />
          <span className={`absolute left-2 top-2 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white ${CONDITION_BADGE[vehicle.condition]}`}>
            {CONDITION_LABEL[vehicle.condition]}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">{formatMileage(vehicle.mileage)}</span>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">{vehicle.drivetrain}</span>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">{vehicle.fuelType}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {vehicle.engine} &middot; {vehicle.transmission}
            </p>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="text-xl font-extrabold text-[#1E3A5F]">{formatPrice(vehicle.price)}</p>
              {vehicle.msrp && vehicle.msrp !== vehicle.price && (
                <p className="text-xs text-gray-400 line-through">MSRP {formatPrice(vehicle.msrp)}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Link
                to={`/inventory/${vehicle.id}`}
                className="rounded-lg bg-[#1E3A5F] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#162240]"
              >
                View Details
              </Link>
              <button
                onClick={() => onCheckAvailability(vehicle)}
                className="rounded-lg border-2 border-[#1E3A5F] px-4 py-2 text-xs font-semibold text-[#1E3A5F] transition hover:bg-[#1E3A5F] hover:text-white"
              >
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid card
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg">
      {/* Image */}
      <div className="relative">
        <VehicleImage vehicle={vehicle} />
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white ${CONDITION_BADGE[vehicle.condition]}`}>
          {CONDITION_LABEL[vehicle.condition]}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#1E3A5F]">
          {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
        </h3>

        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">{formatMileage(vehicle.mileage)}</span>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">{vehicle.drivetrain}</span>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">{vehicle.fuelType}</span>
        </div>

        <p className="mt-1.5 text-[11px] text-gray-500">
          {vehicle.engine} &middot; {vehicle.transmission}
        </p>

        <div className="mt-3">
          <p className="text-xl font-extrabold text-[#1E3A5F]">{formatPrice(vehicle.price)}</p>
          {vehicle.msrp && vehicle.msrp !== vehicle.price && (
            <p className="text-xs text-gray-400 line-through">MSRP {formatPrice(vehicle.msrp)}</p>
          )}
        </div>

        <div className="mt-auto flex gap-2 pt-4">
          <Link
            to={`/inventory/${vehicle.id}`}
            className="flex-1 rounded-lg bg-[#1E3A5F] py-2 text-center text-xs font-semibold text-white transition hover:bg-[#162240]"
          >
            View Details
          </Link>
          <button
            onClick={() => onCheckAvailability(vehicle)}
            className="flex-1 rounded-lg border-2 border-[#1E3A5F] py-2 text-center text-xs font-semibold text-[#1E3A5F] transition hover:bg-[#1E3A5F] hover:text-white"
          >
            Check Availability
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ─── Main Page Component ──────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════
export default function InventoryPage({ condition }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const topRef = useRef(null);

  // ── Derive all unique makes from data ──────────────────────────────────
  const allMakes = useMemo(
    () => [...new Set(vehicles.map((v) => v.make))].sort(),
    []
  );
  const allYears = useMemo(
    () => [...new Set(vehicles.map((v) => v.year))].sort((a, b) => b - a),
    []
  );

  // ── Read filters from URL (or defaults) ────────────────────────────────
  const readParam = (key, fallback = []) => {
    const val = searchParams.get(key);
    return val ? val.split(",") : fallback;
  };

  const [conditions, setConditions] = useState(() =>
    readParam("condition", condition ? [condition] : [])
  );
  const [makes, setMakes] = useState(() => readParam("make"));
  const [bodyStyles, setBodyStyles] = useState(() => readParam("bodyStyle"));
  const [drivetrains, setDrivetrainFilter] = useState(() => readParam("drivetrain"));
  const [fuelTypes, setFuelTypes] = useState(() => readParam("fuelType"));
  const [minYear, setMinYear] = useState(() => searchParams.get("minYear") || "");
  const [maxYear, setMaxYear] = useState(() => searchParams.get("maxYear") || "");
  const [minPrice, setMinPrice] = useState(() => searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(() => searchParams.get("maxPrice") || "");
  const [maxMileage, setMaxMileage] = useState(() => searchParams.get("maxMileage") || "");
  const [searchText, setSearchText] = useState(() => searchParams.get("search") || "");
  const [sortBy, setSortBy] = useState(() => searchParams.get("sort") || "price-asc");
  const [view, setView] = useState(() => searchParams.get("view") || "grid");
  const [page, setPage] = useState(() => Number(searchParams.get("page")) || 1);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [modalVehicle, setModalVehicle] = useState(null);

  // ── Sync condition prop ────────────────────────────────────────────────
  useEffect(() => {
    if (condition) {
      setConditions([condition]);
    }
  }, [condition]);

  // ── Persist filters to URL ─────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams();
    if (conditions.length) params.set("condition", conditions.join(","));
    if (makes.length) params.set("make", makes.join(","));
    if (bodyStyles.length) params.set("bodyStyle", bodyStyles.join(","));
    if (drivetrains.length) params.set("drivetrain", drivetrains.join(","));
    if (fuelTypes.length) params.set("fuelType", fuelTypes.join(","));
    if (minYear) params.set("minYear", minYear);
    if (maxYear) params.set("maxYear", maxYear);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (maxMileage) params.set("maxMileage", maxMileage);
    if (searchText) params.set("search", searchText);
    if (sortBy !== "price-asc") params.set("sort", sortBy);
    if (view !== "grid") params.set("view", view);
    if (page > 1) params.set("page", String(page));
    setSearchParams(params, { replace: true });
  }, [conditions, makes, bodyStyles, drivetrains, fuelTypes, minYear, maxYear, minPrice, maxPrice, maxMileage, searchText, sortBy, view, page, setSearchParams]);

  // ── Filter & Sort ──────────────────────────────────────────────────────
  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];

    if (conditions.length) {
      result = result.filter((v) => conditions.includes(v.condition));
    }
    if (makes.length) {
      result = result.filter((v) => makes.includes(v.make));
    }
    if (bodyStyles.length) {
      result = result.filter((v) => bodyStyles.includes(v.bodyStyle));
    }
    if (drivetrains.length) {
      result = result.filter((v) => drivetrains.includes(v.drivetrain));
    }
    if (fuelTypes.length) {
      result = result.filter((v) => fuelTypes.includes(v.fuelType));
    }
    if (minYear) {
      result = result.filter((v) => v.year >= Number(minYear));
    }
    if (maxYear) {
      result = result.filter((v) => v.year <= Number(maxYear));
    }
    if (minPrice) {
      result = result.filter((v) => v.price >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter((v) => v.price <= Number(maxPrice));
    }
    if (maxMileage) {
      result = result.filter((v) => v.mileage <= Number(maxMileage));
    }
    if (searchText.trim()) {
      const q = searchText.trim().toLowerCase();
      result = result.filter(
        (v) =>
          v.make.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.trim.toLowerCase().includes(q) ||
          v.bodyStyle.toLowerCase().includes(q) ||
          `${v.year}`.includes(q) ||
          `${v.year} ${v.make} ${v.model}`.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "mileage-asc":
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      case "year-desc":
        result.sort((a, b) => b.year - a.year);
        break;
      case "days-asc":
        result.sort((a, b) => a.daysOnLot - b.daysOnLot);
        break;
      default:
        break;
    }

    return result;
  }, [conditions, makes, bodyStyles, drivetrains, fuelTypes, minYear, maxYear, minPrice, maxPrice, maxMileage, searchText, sortBy]);

  // ── Pagination ─────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [filteredVehicles.length, totalPages, page]);

  const paginatedVehicles = useMemo(
    () => filteredVehicles.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE),
    [filteredVehicles, safePage]
  );

  const goToPage = useCallback(
    (p) => {
      setPage(p);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  // ── Clear filters ─────────────────────────────────────────────────────
  const clearFilters = () => {
    setConditions(condition ? [condition] : []);
    setMakes([]);
    setBodyStyles([]);
    setDrivetrainFilter([]);
    setFuelTypes([]);
    setMinYear("");
    setMaxYear("");
    setMinPrice("");
    setMaxPrice("");
    setMaxMileage("");
    setSearchText("");
    setPage(1);
  };

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [conditions, makes, bodyStyles, drivetrains, fuelTypes, minYear, maxYear, minPrice, maxPrice, maxMileage, searchText]);

  // ── Build breadcrumb label ─────────────────────────────────────────────
  const conditionLabel = condition
    ? condition === "certified"
      ? "Certified Pre-Owned"
      : condition.charAt(0).toUpperCase() + condition.slice(1)
    : null;

  // ── Filter sidebar content (shared between desktop & mobile) ──────────
  const filterContent = (
    <div className="space-y-1">
      {/* Condition */}
      <FilterSection title="Condition">
        <CheckboxGroup options={CONDITIONS} selected={conditions} onChange={setConditions} />
      </FilterSection>

      {/* Make */}
      <FilterSection title="Make">
        <CheckboxGroup options={allMakes} selected={makes} onChange={setMakes} />
      </FilterSection>

      {/* Body Style */}
      <FilterSection title="Body Style">
        <CheckboxGroup options={BODY_STYLES} selected={bodyStyles} onChange={setBodyStyles} />
      </FilterSection>

      {/* Year Range */}
      <FilterSection title="Year Range">
        <div className="flex items-center gap-2">
          <select
            value={minYear}
            onChange={(e) => setMinYear(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-[#1E3A5F] focus:outline-none"
          >
            <option value="">Min Year</option>
            {allYears.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <span className="text-gray-400">-</span>
          <select
            value={maxYear}
            onChange={(e) => setMaxYear(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-[#1E3A5F] focus:outline-none"
          >
            <option value="">Max Year</option>
            {allYears.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="flex items-center gap-2">
          <div className="relative w-full">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-1.5 pl-6 pr-2 text-sm focus:border-[#1E3A5F] focus:outline-none"
            />
          </div>
          <span className="text-gray-400">-</span>
          <div className="relative w-full">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-1.5 pl-6 pr-2 text-sm focus:border-[#1E3A5F] focus:outline-none"
            />
          </div>
        </div>
      </FilterSection>

      {/* Mileage */}
      <FilterSection title="Mileage">
        <select
          value={maxMileage}
          onChange={(e) => setMaxMileage(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-[#1E3A5F] focus:outline-none"
        >
          <option value="">Any Mileage</option>
          {MILEAGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </FilterSection>

      {/* Drivetrain */}
      <FilterSection title="Drivetrain">
        <CheckboxGroup options={DRIVETRAINS} selected={drivetrains} onChange={setDrivetrainFilter} />
      </FilterSection>

      {/* Fuel Type */}
      <FilterSection title="Fuel Type">
        <CheckboxGroup options={FUEL_TYPES} selected={fuelTypes} onChange={setFuelTypes} />
      </FilterSection>

      {/* Clear all */}
      <button
        onClick={clearFilters}
        className="mt-4 w-full rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
      >
        Clear All Filters
      </button>
    </div>
  );

  // ── Page number buttons ────────────────────────────────────────────────
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, safePage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [safePage, totalPages]);

  return (
    <div ref={topRef} className="min-h-screen bg-gray-50">
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* breadcrumbs */}
          <nav className="mb-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-[#1E3A5F]">Home</Link>
            <span className="mx-2">/</span>
            {conditionLabel ? (
              <>
                <Link to="/inventory" className="hover:text-[#1E3A5F]">Inventory</Link>
                <span className="mx-2">/</span>
                <span className="text-[#1E3A5F]">{conditionLabel}</span>
              </>
            ) : (
              <span className="text-[#1E3A5F]">Inventory</span>
            )}
          </nav>
          <h1 className="text-2xl font-bold text-[#1E3A5F]">
            {conditionLabel ? `${conditionLabel} Vehicles` : "Our Inventory"}
          </h1>
          <p className="mt-1 text-gray-500 text-sm">{filteredVehicles.length} vehicle{filteredVehicles.length !== 1 ? "s" : ""} available</p>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* ── Desktop Filter Sidebar ────────────────────────────────────── */}
          <aside className="hidden w-[280px] shrink-0 lg:block">
            <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-base font-bold text-[#1E3A5F]">Filters</h2>
              {filterContent}
            </div>
          </aside>

          {/* ── Mobile Filter Button ──────────────────────────────────────── */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#1E3A5F] px-5 py-3 text-sm font-semibold text-white shadow-lg lg:hidden"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

          {/* ── Mobile Filter Drawer ──────────────────────────────────────── */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileFiltersOpen(false)}
                  className="fixed inset-0 z-50 bg-black/40 lg:hidden"
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 250 }}
                  className="fixed inset-y-0 left-0 z-50 w-[320px] max-w-[85vw] overflow-y-auto bg-white p-5 shadow-2xl lg:hidden"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[#1E3A5F]">Filters</h2>
                    <button onClick={() => setMobileFiltersOpen(false)} className="text-gray-500 hover:text-gray-700">
                      <X size={22} />
                    </button>
                  </div>
                  {filterContent}
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* ── Grid Area ─────────────────────────────────────────────────── */}
          <div className="flex-1">
            {/* Search bar */}
            {searchText && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search by make, model, or keyword..."
                  className="flex-1 text-sm outline-none"
                />
                <button onClick={() => setSearchText("")} className="text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Sort / view controls */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {Math.min(filteredVehicles.length, (safePage - 1) * ITEMS_PER_PAGE + 1)}
                  {filteredVehicles.length > 0 ? `-${Math.min(safePage * ITEMS_PER_PAGE, filteredVehicles.length)}` : ""}
                </span>{" "}
                of <span className="font-semibold text-gray-800">{filteredVehicles.length}</span> vehicles
              </p>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1E3A5F] focus:outline-none"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>

                {/* View toggle */}
                <div className="flex overflow-hidden rounded-lg border border-gray-300">
                  <button
                    onClick={() => setView("grid")}
                    className={`p-2 transition ${view === "grid" ? "bg-[#1E3A5F] text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                    title="Grid view"
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-2 transition ${view === "list" ? "bg-[#1E3A5F] text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                    title="List view"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Vehicle cards */}
            {paginatedVehicles.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-20">
                <Search size={48} className="mb-4 text-gray-300" />
                <p className="text-lg font-semibold text-gray-600">No vehicles match your filters</p>
                <p className="mt-1 text-sm text-gray-400">Try adjusting your search criteria</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 rounded-lg bg-[#1E3A5F] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#162240]"
                >
                  Clear All Filters
                </button>
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {paginatedVehicles.map((v, i) => (
                  <VehicleCard
                    key={v.id}
                    vehicle={v}
                    index={i}
                    view="grid"
                    onCheckAvailability={setModalVehicle}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedVehicles.map((v, i) => (
                  <VehicleCard
                    key={v.id}
                    vehicle={v}
                    index={i}
                    view="list"
                    onCheckAvailability={setModalVehicle}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-1">
                <button
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage === 1}
                  className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={16} /> Previous
                </button>

                {pageNumbers[0] > 1 && (
                  <>
                    <button onClick={() => goToPage(1)} className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">1</button>
                    {pageNumbers[0] > 2 && <span className="px-1 text-gray-400">...</span>}
                  </>
                )}

                {pageNumbers.map((p) => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                      p === safePage
                        ? "bg-[#1E3A5F] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                {pageNumbers[pageNumbers.length - 1] < totalPages && (
                  <>
                    {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span className="px-1 text-gray-400">...</span>}
                    <button onClick={() => goToPage(totalPages)} className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">{totalPages}</button>
                  </>
                )}

                <button
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage === totalPages}
                  className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Availability Modal ───────────────────────────────────────────── */}
      <AnimatePresence>
        {modalVehicle && (
          <AvailabilityModal vehicle={modalVehicle} onClose={() => setModalVehicle(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
