import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Award,
  Heart,
  BookOpen,
  Trophy,
  ShieldCheck,
  Star,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const teamMembers = [
  { name: "Sarah Bell-Martinez", title: "General Manager", initials: "SB" },
  { name: "James Cooper", title: "Sales Director", initials: "JC" },
  { name: "Maria Rodriguez", title: "Finance Manager", initials: "MR" },
  { name: "Tom Nguyen", title: "Service Director", initials: "TN" },
  { name: "Ashley Park", title: "Customer Relations Manager", initials: "AP" },
  { name: "Robert Williams", title: "Pre-Owned Manager", initials: "RW" },
];

const avatarGradients = [
  "from-[#1B2A4A] to-[#2d4470]",
  "from-[#D4A843] to-[#e8c36a]",
  "from-[#1B2A4A] to-[#3a5a8a]",
  "from-[#D4A843] to-[#c49a3a]",
  "from-[#1B2A4A] to-[#2d4470]",
  "from-[#D4A843] to-[#e8c36a]",
];

const awards = [
  {
    title: "Toyota President's Award",
    subtitle: "2023, 2024",
    icon: Trophy,
  },
  {
    title: "Honda Premier Partner",
    subtitle: null,
    icon: ShieldCheck,
  },
  {
    title: "BBB A+ Rating",
    subtitle: null,
    icon: ShieldCheck,
  },
  {
    title: "DealerRater Dealer of the Year",
    subtitle: "2024",
    icon: Star,
  },
  {
    title: "Austin Chronicle Best of Austin",
    subtitle: "Auto Dealer",
    icon: Award,
  },
  {
    title: "Hyundai Global Dealer Excellence Award",
    subtitle: null,
    icon: Trophy,
  },
];

const communityItems = [
  {
    name: "Austin Habitat for Humanity",
    detail: "Annual sponsor",
  },
  {
    name: "Central Texas Food Bank",
    detail: "Monthly food drives",
  },
  {
    name: "Austin ISD Scholarship Program",
    detail: "Funded 12 scholarships since 2015",
  },
  {
    name: "Austin Aztex Youth Soccer League",
    detail: "Proud sponsor",
  },
];

export default function AboutPage() {
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
            <BookOpen className="w-12 h-12 text-[#D4A843] mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About Charlie Bell Auto
            </h1>
            <p className="text-xl text-gray-300">
              Serving Austin families since 1987
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-8 text-center"
            >
              Our Story
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-600 text-lg leading-relaxed mb-6"
            >
              Founded in 1987 by Charlie Bell, a lifelong car enthusiast who
              believed buying a car should be as enjoyable as driving one.
              Charlie built his business on a simple promise: treat every
              customer like family, offer fair prices, and never cut corners on
              service.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-gray-600 text-lg leading-relaxed mb-6"
            >
              What started as a small used car lot on South Lamar with just 15
              vehicles has grown over three decades into one of Austin&apos;s
              most respected multi-brand dealerships. Through booms, recessions,
              and the ever-changing automotive landscape, Charlie Bell Auto has
              remained a trusted name in Central Texas.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-gray-600 text-lg leading-relaxed"
            >
              Now run by Charlie&apos;s daughter, Sarah Bell-Martinez, who
              continues the family tradition of transparent pricing, honest
              service, and community involvement. Today the dealership employs
              over 85 people and serves thousands of Austin families each year,
              carrying on the values that Charlie instilled from day one.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <Users className="w-10 h-10 text-[#D4A843] mx-auto mb-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              Meet Our Team
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-24 h-24 rounded-full bg-gradient-to-br ${avatarGradients[index]} mx-auto mb-4 flex items-center justify-center`}
                >
                  <span className="text-white text-2xl font-bold">
                    {member.initials}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#1B2A4A]">
                  {member.name}
                </h3>
                <p className="text-[#D4A843] font-medium mt-1">
                  {member.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards & Certifications */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <Award className="w-10 h-10 text-[#D4A843] mx-auto mb-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              Awards &amp; Certifications
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {awards.map((award, index) => {
              const Icon = award.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-50 rounded-xl p-6 text-center border-2 border-[#1B2A4A]/10 hover:border-[#D4A843]/50 transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-[#1B2A4A] mx-auto mb-4 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-[#D4A843]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1B2A4A]">
                    {award.title}
                  </h3>
                  {award.subtitle && (
                    <p className="text-[#D4A843] font-medium text-sm mt-1">
                      {award.subtitle}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Community Involvement */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-10"
          >
            <Heart className="w-10 h-10 text-[#D4A843] mx-auto mb-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-4">
              Giving Back to Austin
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              At Charlie Bell Auto, we believe in being more than just a
              business. We&apos;re proud to support the organizations that make
              Austin such a special place to live, work, and raise a family.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-6"
          >
            {communityItems.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl p-6 flex items-start gap-4 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-[#D4A843]/10 flex-shrink-0 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#D4A843]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B2A4A] text-lg">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mt-1">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
