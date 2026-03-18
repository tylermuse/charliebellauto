import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Shield,
  CheckCircle,
  FileText,
  Award,
  Star,
  Calendar,
  DollarSign,
  ArrowLeftRight,
  Clock,
  MapPin,
  Phone,
} from "lucide-react";
import { vehicles } from "../data/inventory";
import VehicleImage from "../components/VehicleImage";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const featuredVehicles = vehicles.filter((v) => v.featured);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/inventory?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const conditionBadge = (vehicle) => {
    if (vehicle.condition === "new") return "New";
    if (vehicle.certified) return "CPO";
    return "Used";
  };

  const badgeColor = (vehicle) => {
    if (vehicle.condition === "new") return "bg-emerald-500 text-white";
    if (vehicle.certified) return "bg-blue-500 text-white";
    return "bg-gray-500 text-white";
  };

  return (
    <div>
      {/* ───────────────── Hero Section ───────────────── */}
      <section className="relative bg-gradient-to-br from-navy-700 to-navy-600 py-24 md:py-36 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight"
          >
            Find Your <span className="text-gold-400">Perfect Drive</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-lg md:text-xl text-navy-200 mb-10 max-w-2xl mx-auto"
          >
            Browse over 200 new and pre-owned vehicles at Austin&rsquo;s most trusted dealership
          </motion.p>

          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center max-w-2xl mx-auto bg-white rounded-full overflow-hidden shadow-lg"
          >
            <Search className="ml-5 text-navy-400 flex-shrink-0" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by make, model, or keyword..."
              className="flex-1 px-4 py-4 text-navy-700 placeholder-navy-300 outline-none bg-transparent"
            />
            <button
              type="submit"
              className="bg-gold-400 hover:bg-gold-500 text-navy-800 font-semibold px-6 py-4 transition-colors"
            >
              Search
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {[
              { label: "New Vehicles", to: "/inventory/new" },
              { label: "Used Vehicles", to: "/inventory/used" },
              { label: "Certified Pre-Owned", to: "/inventory/certified" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="border border-gold-400/50 text-gold-300 hover:bg-gold-400 hover:text-navy-800 rounded-full px-5 py-2 text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───────────────── Featured Vehicles ───────────────── */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-16 md:py-24 bg-gray-50 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-700">
              Featured <span className="text-gold-400">Vehicles</span>
            </h2>
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scrollCarousel("left")}
                className="p-2 rounded-full border border-navy-200 hover:bg-navy-700 hover:text-white transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                className="p-2 rounded-full border border-navy-200 hover:bg-navy-700 hover:text-white transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="min-w-[280px] md:min-w-[300px] snap-start bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow flex flex-col"
              >
                {/* Vehicle image */}
                <div className="relative">
                  <VehicleImage vehicle={vehicle} aspect="aspect-[16/10]" className="rounded-t-2xl" />
                  <span
                    className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${badgeColor(vehicle)}`}
                  >
                    {conditionBadge(vehicle)}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-navy-700">
                    {vehicle.year} {vehicle.make} {vehicle.model}{" "}
                    <span className="font-normal text-navy-400">{vehicle.trim}</span>
                  </h3>

                  <p className="text-2xl font-bold text-gold-500 mt-1">
                    ${vehicle.price.toLocaleString()}
                  </p>

                  <p className="text-sm text-navy-400 mt-1">
                    {vehicle.mileage.toLocaleString()} miles
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3 text-xs text-navy-500">
                    <span className="bg-navy-50 px-2 py-1 rounded">{vehicle.engine}</span>
                    <span className="bg-navy-50 px-2 py-1 rounded">{vehicle.drivetrain}</span>
                  </div>

                  <div className="mt-auto pt-4">
                    <Link
                      to={`/inventory/${vehicle.id}`}
                      className="block text-center bg-navy-700 hover:bg-navy-800 text-white font-semibold py-2.5 rounded-lg transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ───────────────── Why Choose Us ───────────────── */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-16 md:py-24 bg-white px-4"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-700 text-center mb-14">
            Why Choose <span className="text-gold-400">Charlie Bell Auto</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "No-Haggle Pricing",
                desc: "Our transparent pricing means the price you see is the price you pay. No games, no gimmicks.",
              },
              {
                icon: CheckCircle,
                title: "Certified Inspections",
                desc: "Every vehicle undergoes a rigorous 150-point inspection before hitting our lot.",
              },
              {
                icon: FileText,
                title: "Free CARFAX Reports",
                desc: "Get complete vehicle history reports at no cost on every pre-owned vehicle.",
              },
              {
                icon: Award,
                title: "Lifetime Powertrain Warranty",
                desc: "Drive with confidence knowing your powertrain is covered for as long as you own the vehicle.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="text-center bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold-50 mb-5">
                  <Icon className="text-gold-400" size={28} />
                </div>
                <h3 className="text-lg font-bold text-navy-700 mb-2">{title}</h3>
                <p className="text-navy-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ───────────────── Current Promotions ───────────────── */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-16 md:py-24 bg-gray-50 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-700 text-center mb-14">
            Current <span className="text-gold-400">Promotions</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Promo 1 */}
            <div className="bg-white rounded-2xl shadow-md border-l-4 border-gold-400 p-8">
              <h3 className="text-2xl font-bold text-navy-700 mb-2">0% APR for 60 Months</h3>
              <p className="text-navy-500 mb-1">
                On select new Toyota and Honda models.
              </p>
              <p className="text-sm text-navy-400 mb-6">
                Limited time offer. Ends March 31st.
              </p>
              <Link
                to="/inventory/new"
                className="inline-block bg-gold-400 hover:bg-gold-500 text-navy-800 font-semibold px-6 py-2.5 rounded-lg transition-colors"
              >
                View Inventory
              </Link>
            </div>

            {/* Promo 2 */}
            <div className="bg-white rounded-2xl shadow-md border-l-4 border-gold-400 p-8">
              <h3 className="text-2xl font-bold text-navy-700 mb-2">Up to $3,000 Off</h3>
              <p className="text-navy-500 mb-1">
                On certified pre-owned vehicles.
              </p>
              <p className="text-sm text-navy-400 mb-6">
                Plus complimentary 2-year maintenance package.
              </p>
              <Link
                to="/inventory/certified"
                className="inline-block bg-gold-400 hover:bg-gold-500 text-navy-800 font-semibold px-6 py-2.5 rounded-lg transition-colors"
              >
                Shop CPO
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ───────────────── Testimonials ───────────────── */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-16 md:py-24 bg-white px-4"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-700 text-center mb-14">
            What Our <span className="text-gold-400">Customers Say</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The team at Charlie Bell Auto made buying my first car an incredible experience. No pressure, just genuine help.",
                name: "Sarah Mitchell",
                initials: "SM",
              },
              {
                quote:
                  "Best trade-in value in Austin. I checked three other dealers before coming here and Charlie Bell beat them all.",
                name: "Marcus Johnson",
                initials: "MJ",
              },
              {
                quote:
                  "Had my Accord serviced here for 5 years. Always honest, always fair. Wouldn't go anywhere else.",
                name: "David Chen",
                initials: "DC",
              },
            ].map(({ quote, name, initials }) => (
              <div
                key={name}
                className="bg-gray-50 rounded-2xl p-8 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-gold-400 fill-gold-400"
                    />
                  ))}
                </div>

                <p className="text-navy-600 leading-relaxed italic flex-1">
                  &ldquo;{quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 mt-6">
                  <div className="w-10 h-10 rounded-full bg-navy-700 text-white flex items-center justify-center text-sm font-bold">
                    {initials}
                  </div>
                  <span className="font-semibold text-navy-700">{name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ───────────────── Map & Hours ───────────────── */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-16 md:py-24 bg-gray-50 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-700 text-center mb-14">
            Visit <span className="text-gold-400">Our Dealership</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-md h-[400px]">
              <iframe
                title="Charlie Bell Auto Location"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.openstreetmap.org/export/embed.html?bbox=-97.7903%2C30.1872%2C-97.7503%2C30.2272&layer=mapnik&marker=30.2072%2C-97.7703"
                allowFullScreen
              />
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="text-gold-400" size={22} />
                <h3 className="text-xl font-bold text-navy-700">Hours of Operation</h3>
              </div>

              {[
                {
                  department: "Sales",
                  hours: [
                    { days: "Mon - Fri", time: "9:00 AM - 8:00 PM" },
                    { days: "Saturday", time: "9:00 AM - 6:00 PM" },
                    { days: "Sunday", time: "12:00 PM - 5:00 PM" },
                  ],
                },
                {
                  department: "Service",
                  hours: [
                    { days: "Mon - Fri", time: "7:30 AM - 6:00 PM" },
                    { days: "Saturday", time: "8:00 AM - 4:00 PM" },
                    { days: "Sunday", time: "Closed" },
                  ],
                },
                {
                  department: "Parts",
                  hours: [
                    { days: "Mon - Fri", time: "7:30 AM - 6:00 PM" },
                    { days: "Saturday", time: "8:00 AM - 4:00 PM" },
                    { days: "Sunday", time: "Closed" },
                  ],
                },
              ].map(({ department, hours }, idx) => (
                <div key={department} className={idx > 0 ? "mt-6 pt-6 border-t border-gray-100" : ""}>
                  <h4 className="font-semibold text-navy-700 mb-3">{department}</h4>
                  <div className="space-y-1">
                    {hours.map(({ days, time }) => (
                      <div key={days} className="flex justify-between text-sm">
                        <span className="text-navy-500">{days}</span>
                        <span className="text-navy-700 font-medium">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-8 pt-6 border-t border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-sm text-navy-500">
                  <MapPin size={16} className="text-gold-400 flex-shrink-0" />
                  <span>4200 Auto Mall Parkway, Austin, TX 78745</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-navy-500">
                  <Phone size={16} className="text-gold-400 flex-shrink-0" />
                  <span>(512) 555-0199</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ───────────────── CTA Strip ───────────────── */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="bg-gold-400 py-12 px-4"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Calendar, label: "Schedule a Test Drive", to: "/contact" },
            { icon: DollarSign, label: "Get Pre-Approved", to: "/finance" },
            { icon: ArrowLeftRight, label: "Value Your Trade", to: "/finance" },
          ].map(({ icon: Icon, label, to }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/25 backdrop-blur-sm rounded-xl px-6 py-5 transition-colors group"
            >
              <Icon
                size={24}
                className="text-navy-800 group-hover:scale-110 transition-transform"
              />
              <span className="text-navy-800 font-bold text-lg">{label}</span>
            </Link>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
