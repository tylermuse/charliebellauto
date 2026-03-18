import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Wrench,
  CheckCircle,
  Scissors,
  Clock,
  ShieldCheck,
  Droplets,
  Cog,
  Thermometer,
  Battery,
  FileCheck,
  Tag,
  Package,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const serviceTypes = [
  "Oil Change",
  "Tire Rotation",
  "Brake Service",
  "Engine Diagnostic",
  "Transmission Service",
  "A/C Service",
  "Battery Replacement",
  "State Inspection",
  "Other",
];

const timeSlots = [
  "7:00 AM",
  "7:30 AM",
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
];

const serviceMenu = [
  {
    name: "Oil Change",
    price: "Starting at $39.95",
    description:
      "Conventional or synthetic oil change with filter replacement and multi-point inspection.",
    icon: Droplets,
  },
  {
    name: "Tire Rotation",
    price: "Starting at $24.95",
    description:
      "Extend tire life with regular rotations. Includes brake inspection.",
    icon: Cog,
  },
  {
    name: "Brake Service",
    price: "Starting at $149.95",
    description:
      "Complete brake inspection, pad replacement, and rotor resurfacing.",
    icon: ShieldCheck,
  },
  {
    name: "Engine Diagnostic",
    price: "Starting at $89.95",
    description:
      "Full computer diagnostic to identify check engine light causes.",
    icon: Wrench,
  },
  {
    name: "Transmission Service",
    price: "Starting at $179.95",
    description:
      "Fluid exchange and filter replacement for smooth shifting.",
    icon: Cog,
  },
  {
    name: "A/C Service",
    price: "Starting at $129.95",
    description:
      "Recharge and leak test to keep you cool in Texas heat.",
    icon: Thermometer,
  },
  {
    name: "Battery Replacement",
    price: "Starting at $149.95",
    description:
      "Battery test and replacement with a 3-year warranty.",
    icon: Battery,
  },
  {
    name: "State Inspection",
    price: "$25.50",
    description:
      "Texas state inspection to keep your vehicle road-legal.",
    icon: FileCheck,
  },
];

const specials = [
  {
    title: "$10 Off Any Oil Change",
    details:
      "Present this offer at time of service. Cannot be combined with other offers. Expires 04/30/2026.",
  },
  {
    title: "Free Tire Rotation with Any Service Over $100",
    details: "Keep your tires in top shape. Expires 04/30/2026.",
  },
  {
    title: "15% Off Brake Service",
    details:
      "Safety first. Save on complete brake service. Expires 04/30/2026.",
  },
];

const urgencyOptions = ["No Rush", "Within a Week", "Urgent"];

export default function ServicePage() {
  // Schedule service form
  const [serviceForm, setServiceForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    serviceType: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });
  const [serviceSubmitted, setServiceSubmitted] = useState(false);

  // Parts request form
  const [partsForm, setPartsForm] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    partDescription: "",
    urgency: "",
  });
  const [partsSubmitted, setPartsSubmitted] = useState(false);

  const handleServiceChange = (e) => {
    setServiceForm({ ...serviceForm, [e.target.name]: e.target.value });
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    setServiceSubmitted(true);
  };

  const handlePartsChange = (e) => {
    setPartsForm({ ...partsForm, [e.target.name]: e.target.value });
  };

  const handlePartsSubmit = (e) => {
    e.preventDefault();
    setPartsSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1B2A4A] text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center"
          >
            <Wrench className="w-12 h-12 text-[#D4A843] mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Service &amp; Parts Center
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Factory-trained technicians. Genuine parts. Your vehicle deserves
              the best.
            </p>
            <a
              href="#schedule-service"
              className="inline-flex items-center px-8 py-3 bg-[#D4A843] text-white font-semibold rounded-lg hover:bg-[#c49a3a] transition-colors text-lg"
            >
              Schedule Service
            </a>
          </motion.div>
        </div>
      </section>

      {/* Schedule Service Form */}
      <section id="schedule-service" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="text-center mb-10">
              <Clock className="w-10 h-10 text-[#D4A843] mx-auto mb-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
                Schedule Service
              </h2>
            </div>

            {serviceSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl p-10 text-center shadow-lg"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#1B2A4A] mb-3">
                  Appointment Requested!
                </h3>
                <p className="text-gray-600 text-lg">
                  Your service appointment request has been submitted. Our
                  service team will confirm your appointment within one business
                  day.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleServiceSubmit}
                className="bg-white rounded-xl p-8 shadow-lg space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={serviceForm.firstName}
                      onChange={handleServiceChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A843]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={serviceForm.lastName}
                      onChange={handleServiceChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A843]"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={serviceForm.email}
                      onChange={handleServiceChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A843]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={serviceForm.phone}
                      onChange={handleServiceChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A843]"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vehicle Year
                    </label>
                    <input
                      type="text"
                      name="vehicleYear"
                      value={serviceForm.vehicleYear}
                      onChange={handleServiceChange}
                      placeholder="e.g., 2022"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A843]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Make
                    </label>
                    <input
                      type="text"
                      name="vehicleMake"
                      value={serviceForm.vehicleMake}
                      onChange={handleServiceChange}
                      placeholder="e.g., Toyota"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A843]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <input
                      type="text"
                      name="vehicleModel"
                      value={serviceForm.vehicleModel}
                      onChange={handleServiceChange}
                      placeholder="e.g., Camry"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A843]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Type
                  </label>
                  <select
                    name="serviceType"
                    value={serviceForm.serviceType}
                    onChange={handleServiceChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A843] bg-white"
                  >
                    <option value="">Select a service</option>
                    {serviceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={serviceForm.preferredDate}
                      onChange={handleServiceChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A843]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Time
                    </label>
                    <select
                      name="preferredTime"
                      value={serviceForm.preferredTime}
                      onChange={handleServiceChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A843] bg-white"
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={serviceForm.notes}
                    onChange={handleServiceChange}
                    rows={3}
                    placeholder="Describe any symptoms or concerns..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A843]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#D4A843] text-white font-semibold rounded-lg hover:bg-[#c49a3a] transition-colors text-lg"
                >
                  Request Appointment
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Service Menu */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              Service Menu
            </h2>
            <p className="text-gray-600">
              Transparent pricing on our most popular services.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {serviceMenu.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.name}
                  variants={fadeInUp}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <Icon className="w-10 h-10 text-[#D4A843] mb-4" />
                  <h3 className="text-lg font-bold text-[#1B2A4A] mb-1">
                    {service.name}
                  </h3>
                  <p className="text-[#D4A843] font-semibold mb-3">
                    {service.price}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Service Specials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <Tag className="w-10 h-10 text-[#D4A843] mx-auto mb-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              Service Specials
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {specials.map((special, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl p-6 border-2 border-dashed border-[#D4A843] text-center hover:shadow-lg transition-shadow"
              >
                <Scissors className="w-8 h-8 text-[#D4A843] mx-auto mb-3" />
                <h3 className="text-xl font-bold text-[#1B2A4A] mb-3">
                  {special.title}
                </h3>
                <p className="text-gray-600 text-sm">{special.details}</p>
                <div className="mt-4 pt-4 border-t border-dashed border-gray-300">
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                    Charlie Bell Auto Service
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Parts Request */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="text-center mb-10">
              <Package className="w-10 h-10 text-[#D4A843] mx-auto mb-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
                Parts Request
              </h2>
              <p className="text-gray-600">
                Need a specific part? Let us know and we&apos;ll track it down
                for you.
              </p>
            </div>

            {partsSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-50 rounded-xl p-10 text-center shadow-lg"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#1B2A4A] mb-3">
                  Request Submitted!
                </h3>
                <p className="text-gray-600 text-lg">
                  Our parts department will check availability and contact you
                  with pricing and an estimated delivery time.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handlePartsSubmit}
                className="bg-gray-50 rounded-xl p-8 shadow-lg space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={partsForm.name}
                      onChange={handlePartsChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A843]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={partsForm.email}
                      onChange={handlePartsChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A843]"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={partsForm.phone}
                      onChange={handlePartsChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A843]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Urgency
                    </label>
                    <select
                      name="urgency"
                      value={partsForm.urgency}
                      onChange={handlePartsChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A843] bg-white"
                    >
                      <option value="">Select urgency</option>
                      {urgencyOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vehicle Year
                    </label>
                    <input
                      type="text"
                      name="vehicleYear"
                      value={partsForm.vehicleYear}
                      onChange={handlePartsChange}
                      placeholder="e.g., 2022"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A843]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Make
                    </label>
                    <input
                      type="text"
                      name="vehicleMake"
                      value={partsForm.vehicleMake}
                      onChange={handlePartsChange}
                      placeholder="e.g., Honda"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A843]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <input
                      type="text"
                      name="vehicleModel"
                      value={partsForm.vehicleModel}
                      onChange={handlePartsChange}
                      placeholder="e.g., Civic"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A843]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Part Description
                  </label>
                  <textarea
                    name="partDescription"
                    value={partsForm.partDescription}
                    onChange={handlePartsChange}
                    rows={3}
                    required
                    placeholder="Describe the part you need, including any part numbers if available..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A843]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#D4A843] text-white font-semibold rounded-lg hover:bg-[#c49a3a] transition-colors text-lg"
                >
                  Submit Parts Request
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
