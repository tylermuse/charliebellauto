import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  MapPin,
  Phone,
  Tag,
  ClipboardCheck,
  FileText,
  Shield,
} from "lucide-react";
import { vehicles } from "../data/inventory";
import VehicleImage from "../components/VehicleImage";

export default function HomePage() {
  const carouselRef = useRef(null);

  const featuredVehicles = vehicles.filter((v) => v.featured);

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

  const lotTag = (vehicle) => {
    if (vehicle.daysOnLot <= 5) return { label: "Just Arrived", color: "bg-emerald-500 text-white" };
    if (vehicle.daysOnLot >= 40) return { label: "Price Drop", color: "bg-[#C45D3E] text-white" };
    return null;
  };

  return (
    <div>
      {/* ───────────────── Hero Section ───────────────── */}
      <section
        className="relative min-h-[480px] md:min-h-[540px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('/hero-lot.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-[60%] md:max-w-[55%]">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight">
              No surprises. No haggling.
              <br />
              Just the right car.
            </h1>

            <p className="text-white/80 text-lg mt-5 max-w-lg">
              Austin&rsquo;s trusted dealership since 1987 &mdash; over 200 vehicles ready to drive home today.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/inventory"
                className="bg-white text-[#1E3A5F] font-semibold px-7 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Browse Inventory
              </Link>
              <Link
                to="/finance"
                className="border border-white text-white font-semibold px-7 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Get Pre-Approved
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── Featured Vehicles ───────────────── */}
      <section className="py-12 md:py-16 bg-white px-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-normal text-navy-700">
              Featured Vehicles
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
            {featuredVehicles.map((vehicle) => {
              const tag = lotTag(vehicle);
              return (
                <div
                  key={vehicle.id}
                  className="group min-w-[280px] md:min-w-[300px] snap-start bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow flex flex-col"
                >
                  {/* Vehicle image */}
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <VehicleImage
                      vehicle={vehicle}
                      aspect="aspect-[16/10]"
                      className="rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <span
                      className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${badgeColor(vehicle)}`}
                    >
                      {conditionBadge(vehicle)}
                    </span>
                    {tag && (
                      <span
                        className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full ${tag.color}`}
                      >
                        {tag.label}
                      </span>
                    )}
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
              );
            })}
          </div>

          <div className="flex justify-end mt-4">
            <Link to="/inventory" className="text-sm font-medium text-[#1E3A5F] hover:underline">
              See all inventory &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── Why Choose Us ───────────────── */}
      <section className="py-14 md:py-20 bg-white px-4 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-normal text-navy-700 text-center mb-14">
            Why Choose Charlie Bell Auto
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Tag,
                title: "No-Haggle Pricing",
                desc: "The price on the window is the price you pay. No back-and-forth, no \u2018let me talk to my manager.\u2019",
              },
              {
                icon: ClipboardCheck,
                title: "Certified Inspections",
                desc: "168-point inspection by ASE-certified techs. We reject about 1 in 5 trade-ins that don\u2019t meet our standards.",
              },
              {
                icon: FileText,
                title: "Free CARFAX Reports",
                desc: "Full vehicle history on every pre-owned car, truck, and SUV \u2014 before you even ask.",
              },
              {
                icon: Shield,
                title: "Lifetime Powertrain Warranty",
                desc: "Engine and transmission covered for as long as you own it. No mileage cap, no catch.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <h3 className="flex items-center gap-2 text-lg font-bold text-navy-700 mb-2">
                  <Icon className="w-5 h-5 text-[#C45D3E] flex-shrink-0" />
                  {title}
                </h3>
                <p className="text-navy-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Current Promotions ───────────────── */}
      <section className="py-10 md:py-14 bg-white px-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-normal text-navy-700 text-center mb-14">
            Current Promotions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Promo 1 */}
            <div className="bg-white rounded-2xl shadow-md border-l-4 border-[#C45D3E] p-8">
              <h3 className="text-2xl font-bold text-navy-700 mb-2">0% APR for 60 Months</h3>
              <p className="text-navy-500 mb-1">
                On 2025 Camry LE &amp; SE models.
              </p>
              <p className="text-xs text-navy-400 mb-6 leading-relaxed">
                With approved credit through Toyota Financial Services. Not all buyers will qualify. Offer expires 03/31/2026. See dealer for details.
              </p>
              <Link
                to="/inventory/new"
                className="inline-block bg-[#1E3A5F] hover:bg-[#2d4a7a] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
              >
                View Inventory
              </Link>
            </div>

            {/* Promo 2 */}
            <div className="bg-white rounded-2xl shadow-md border-l-4 border-[#C45D3E] p-8">
              <h3 className="text-2xl font-bold text-navy-700 mb-2">Up to $3,000 Off</h3>
              <p className="text-navy-500 mb-1">
                Certified pre-owned Highlander, CR-V, and Tucson.
              </p>
              <p className="text-xs text-navy-400 mb-6 leading-relaxed">
                With approved credit through Toyota Financial Services. Not all buyers will qualify. Offer expires 03/31/2026. See dealer for details.
              </p>
              <Link
                to="/inventory/certified"
                className="inline-block bg-[#1E3A5F] hover:bg-[#2d4a7a] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
              >
                Shop CPO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── Testimonials ───────────────── */}
      <section className="py-16 md:py-24 bg-[#F5F3F0] px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-normal text-navy-700 text-center mb-14">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                quote:
                  "Mike in finance made the paperwork completely painless. In and out in under two hours with my new Highlander.",
                name: "Patricia Dominguez",
                location: "Cedar Park",
                stars: 5,
              },
              {
                quote:
                  "Third car I\u2019ve bought here. My daughter just got her first Corolla from Charlie Bell too. Wouldn\u2019t go anywhere else.",
                name: "James Whitaker III",
                location: "South Austin",
                stars: 5,
              },
              {
                quote:
                  "Best trade-in offer in town \u2014 checked three other dealers first.",
                name: "Kenji Nakamura",
                location: "Round Rock",
                stars: 4,
              },
              {
                quote:
                  "The service department is honest. They told me I DIDN\u2019T need new brakes when another shop said I did. Customer for life.",
                name: "Maria Santos",
                location: "Pflugerville",
                stars: 5,
              },
            ].map(({ quote, name, location, stars }) => (
              <div
                key={name}
                className="bg-white rounded-2xl p-8"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < stars
                          ? "text-gold-400 fill-gold-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                <p className="text-navy-600 leading-relaxed italic">
                  &ldquo;{quote}&rdquo;
                </p>

                <div className="mt-5">
                  <span className="font-semibold text-navy-700">{name}</span>
                  <span className="text-gray-500 ml-2">{location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Map & Hours ───────────────── */}
      <section className="py-10 md:py-16 bg-white px-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-normal text-navy-700 text-center mb-14">
            Visit Our Dealership
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
                <Clock className="text-[#C45D3E]" size={22} />
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
                  <MapPin size={16} className="text-[#C45D3E] flex-shrink-0" />
                  <span>9831 S Congress Ave, Austin, TX 78745</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-navy-500">
                  <Phone size={16} className="text-[#C45D3E] flex-shrink-0" />
                  <span>(512) 847-3261</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── CTA Strip ───────────────── */}
      <section className="bg-[#1E3A5F] py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="font-display text-xl md:text-2xl text-white font-normal text-center md:text-left">
            Over 2,400 families have driven home happy since 1987.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              to="/contact"
              className="bg-white text-[#1E3A5F] font-semibold px-7 py-3 rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              Schedule a Test Drive
            </Link>
            <Link
              to="/finance"
              className="border border-white text-white font-semibold px-7 py-3 rounded-lg hover:bg-white/10 transition-colors text-center"
            >
              Get Pre-Approved
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
