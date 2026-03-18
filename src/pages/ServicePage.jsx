import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
} from "lucide-react";

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
  },
  {
    name: "Tire Rotation",
    price: "Starting at $24.95",
    description:
      "Extend tire life with regular rotations. Includes brake inspection.",
  },
  {
    name: "Brake Service",
    price: "Starting at $149.95",
    description:
      "Complete brake inspection, pad replacement, and rotor resurfacing.",
  },
  {
    name: "Engine Diagnostic",
    price: "Starting at $89.95",
    description:
      "Full computer diagnostic to identify check engine light causes.",
  },
  {
    name: "Transmission Service",
    price: "Starting at $179.95",
    description:
      "Fluid exchange and filter replacement for smooth shifting.",
  },
  {
    name: "A/C Service",
    price: "Starting at $129.95",
    description:
      "Recharge and leak test to keep you cool in Texas heat.",
  },
  {
    name: "Battery Replacement",
    price: "Starting at $149.95",
    description:
      "Battery test and replacement with a 3-year warranty.",
  },
  {
    name: "State Inspection",
    price: "$25.50",
    description:
      "Texas state inspection to keep your vehicle road-legal.",
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
      {/* Page Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-[#1E3A5F]">Service & Parts</h1>
        </div>
      </div>

      {/* Schedule Service Form */}
      <section id="schedule-service" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">
                Schedule Service
              </h2>
            </div>

            {serviceSubmitted ? (
              <div
                className="bg-white rounded-xl p-10 text-center shadow-lg"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#1E3A5F] mb-3">
                  Appointment Requested!
                </h3>
                <p className="text-gray-600 text-lg">
                  Your service appointment request has been submitted. Our
                  service team will confirm your appointment within one business
                  day.
                </p>
              </div>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] bg-white"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] bg-white"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#1E3A5F] text-white font-semibold rounded-lg hover:bg-[#2d4a7a] transition-colors text-lg"
                >
                  Request Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Service Menu */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">
              Service Menu
            </h2>
            <p className="text-gray-600">
              Transparent pricing on our most popular services.
            </p>
          </div>
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {serviceMenu.map((service) => (
              <div
                key={service.name}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-[#1E3A5F] mb-1">
                  {service.name}
                </h3>
                <p className="text-[#C45D3E] font-semibold mb-3">
                  {service.price}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Specials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">
              Service Specials
            </h2>
          </div>
          <div
            className="grid md:grid-cols-3 gap-6"
          >
            {specials.map((special, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border-2 border-dashed border-[#C45D3E] text-center hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-[#1E3A5F] mb-3">
                  {special.title}
                </h3>
                <p className="text-gray-600 text-sm">{special.details}</p>
                <div className="mt-4 pt-4 border-t border-dashed border-gray-300">
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                    Charlie Bell Auto Service
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parts Request */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">
                Parts Request
              </h2>
              <p className="text-gray-600">
                Need a specific part? Let us know and we&apos;ll track it down
                for you.
              </p>
            </div>

            {partsSubmitted ? (
              <div
                className="bg-gray-50 rounded-xl p-10 text-center shadow-lg"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#1E3A5F] mb-3">
                  Request Submitted!
                </h3>
                <p className="text-gray-600 text-lg">
                  Our parts department will check availability and contact you
                  with pricing and an estimated delivery time.
                </p>
              </div>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] bg-white"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#1E3A5F] text-white font-semibold rounded-lg hover:bg-[#2d4a7a] transition-colors text-lg"
                >
                  Submit Parts Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
