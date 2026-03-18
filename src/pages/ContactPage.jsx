import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const subjectOptions = [
  "General Inquiry",
  "Vehicle Inquiry",
  "Service Question",
  "Finance Question",
  "Feedback",
  "Other",
];

const contactCards = [
  {
    icon: MapPin,
    title: "Address",
    detail: "4200 Auto Mall Parkway, Austin, TX 78745",
    linkLabel: "Get Directions",
    href: "https://www.google.com/maps/search/?api=1&query=4200+Auto+Mall+Parkway+Austin+TX+78745",
    external: true,
  },
  {
    icon: Phone,
    title: "Phone",
    detail: "(512) 555-0199",
    linkLabel: "Call Us",
    href: "tel:+15125550199",
    external: true,
  },
  {
    icon: Mail,
    title: "Email",
    detail: "info@charliebellauto.com",
    linkLabel: "Email Us",
    href: "mailto:info@charliebellauto.com",
    external: true,
  },
];

const departments = [
  {
    name: "Sales Department",
    phone: "(512) 555-0199 ext. 1",
    hours: "Mon-Fri 9am-8pm",
  },
  {
    name: "Service Center",
    phone: "(512) 555-0199 ext. 2",
    hours: "Mon-Fri 7:30am-6pm",
  },
  {
    name: "Parts Department",
    phone: "(512) 555-0199 ext. 3",
    hours: "Mon-Fri 7:30am-6pm",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* ───────────────── Hero ───────────────── */}
      <section className="relative bg-gradient-to-br from-navy-700 to-navy-600 py-20 md:py-28 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight"
          >
            Contact <span className="text-gold-400">Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-lg md:text-xl text-navy-200 max-w-2xl mx-auto"
          >
            We&rsquo;re here to help. Reach out anytime.
          </motion.p>
        </div>
      </section>

      {/* ───────────────── Two-Column: Form + Info ───────────────── */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-16 md:py-24 bg-gray-50 px-4"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Form */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-navy-700 mb-6">Send Us a Message</h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Send className="text-emerald-600" size={28} />
                </div>
                <h3 className="text-xl font-bold text-navy-700 mb-2">Message Sent!</h3>
                <p className="text-navy-500">
                  Thank you for reaching out! We&rsquo;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-navy-600 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-navy-700 outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-600 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-navy-700 outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-navy-600 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-navy-700 outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-600 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-navy-700 outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-600 mb-1">Subject</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-navy-700 outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition bg-white"
                  >
                    <option value="">Select a subject</option>
                    {subjectOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-600 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-navy-700 outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold-400 hover:bg-gold-500 text-navy-800 font-semibold py-3 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact Information */}
          <div className="space-y-6">
            {contactCards.map(({ icon: Icon, title, detail, linkLabel, href }) => (
              <div
                key={title}
                className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gold-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="text-gold-400" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-navy-700 mb-1">{title}</h3>
                  <p className="text-navy-500 text-sm mb-2">{detail}</p>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-500 hover:text-gold-600 text-sm font-semibold transition-colors"
                  >
                    {linkLabel} &rarr;
                  </a>
                </div>
              </div>
            ))}

            {/* Hours Card */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-gold-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="text-gold-400" size={22} />
                </div>
                <h3 className="font-bold text-navy-700">Hours of Operation</h3>
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
                <div
                  key={department}
                  className={idx > 0 ? "mt-5 pt-5 border-t border-gray-100" : ""}
                >
                  <h4 className="font-semibold text-navy-700 mb-2">{department}</h4>
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
            </div>
          </div>
        </div>
      </motion.section>

      {/* ───────────────── Google Maps ───────────────── */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-16 md:py-24 bg-white px-4"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-700 text-center mb-10">
            Find <span className="text-gold-400">Us</span>
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-md">
            <iframe
              title="Charlie Bell Auto Location"
              width="100%"
              height="400"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.openstreetmap.org/export/embed.html?bbox=-97.79%2C30.19%2C-97.75%2C30.22&layer=mapnik&marker=30.2072%2C-97.7703"
              allowFullScreen
            />
          </div>
        </div>
      </motion.section>

      {/* ───────────────── Departments Strip ───────────────── */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-16 md:py-24 bg-gray-50 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-700 text-center mb-10">
            Our <span className="text-gold-400">Departments</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {departments.map(({ name, phone, hours }) => (
              <div
                key={name}
                className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold-50 mb-5">
                  <Phone className="text-gold-400" size={24} />
                </div>
                <h3 className="text-lg font-bold text-navy-700 mb-2">{name}</h3>
                <p className="text-navy-500 font-medium mb-1">{phone}</p>
                <p className="text-sm text-navy-400">{hours}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
