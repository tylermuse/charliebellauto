import React from "react";
import { Link } from "react-router-dom";

const teamMembers = [
  { name: "Sarah Bell-Martinez", title: "General Manager", initials: "SB" },
  { name: "James Cooper", title: "Sales Director", initials: "JC" },
  { name: "Maria Rodriguez", title: "Finance Manager", initials: "MR" },
  { name: "Tom Nguyen", title: "Service Director", initials: "TN" },
  { name: "Ashley Park", title: "Customer Relations Manager", initials: "AP" },
  { name: "Robert Williams", title: "Pre-Owned Manager", initials: "RW" },
];

const avatarGradients = [
  "from-[#1E3A5F] to-[#2d4470]",
  "from-[#1E3A5F] to-[#2d4470]",
  "from-[#1E3A5F] to-[#3a5a8a]",
  "from-[#1E3A5F] to-[#2d4470]",
  "from-[#1E3A5F] to-[#2d4470]",
  "from-[#1E3A5F] to-[#3a5a8a]",
];

const awards = [
  {
    title: "Toyota President's Award",
    subtitle: "2023, 2024",
  },
  {
    title: "Honda Premier Partner",
    subtitle: null,
  },
  {
    title: "BBB A+ Rating",
    subtitle: null,
  },
  {
    title: "DealerRater Dealer of the Year",
    subtitle: "2024",
  },
  {
    title: "Austin Chronicle Best of Austin",
    subtitle: "Auto Dealer",
  },
  {
    title: "Hyundai Global Dealer Excellence Award",
    subtitle: null,
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
      {/* Page Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-[#1E3A5F]">About Us</h1>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-8 text-center"
            >
              Our Story
            </h2>
            <p
              className="text-gray-600 text-lg leading-relaxed mb-6"
            >
              Founded in 1987 by Charlie Bell, a lifelong car enthusiast who
              believed buying a car should be as enjoyable as driving one.
              Charlie built his business on a simple promise: treat every
              customer like family, offer fair prices, and never cut corners on
              service.
            </p>
            <p
              className="text-gray-600 text-lg leading-relaxed mb-6"
            >
              What started as a small used car lot on South Lamar with just 15
              vehicles has grown over three decades into one of Austin&apos;s
              most respected multi-brand dealerships. Through booms, recessions,
              and the ever-changing automotive landscape, Charlie Bell Auto has
              remained a trusted name in Central Texas.
            </p>
            <p
              className="text-gray-600 text-lg leading-relaxed"
            >
              Now run by Charlie&apos;s daughter, Sarah Bell-Martinez, who
              continues the family tradition of transparent pricing, honest
              service, and community involvement. Today the dealership employs
              over 85 people and serves thousands of Austin families each year,
              carrying on the values that Charlie instilled from day one.
            </p>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">
              Meet Our Team
            </h2>
          </div>
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-24 h-24 rounded-full bg-gradient-to-br ${avatarGradients[index]} mx-auto mb-4 flex items-center justify-center`}
                >
                  <span className="text-white text-2xl font-bold">
                    {member.initials}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#1E3A5F]">
                  {member.name}
                </h3>
                <p className="text-[#1E3A5F] font-medium mt-1">
                  {member.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Certifications */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">
              Awards &amp; Certifications
            </h2>
          </div>
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {awards.map((award, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center border-2 border-[#1E3A5F]/10 hover:border-[#1E3A5F]/30 transition-colors"
              >
                <h3 className="text-lg font-bold text-[#1E3A5F]">
                  {award.title}
                </h3>
                {award.subtitle && (
                  <p className="text-[#1E3A5F] font-medium text-sm mt-1">
                    {award.subtitle}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Involvement */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              Giving Back to Austin
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              At Charlie Bell Auto, we believe in being more than just a
              business. We&apos;re proud to support the organizations that make
              Austin such a special place to live, work, and raise a family.
            </p>
          </div>
          <div
            className="grid sm:grid-cols-2 gap-6"
          >
            {communityItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="font-bold text-[#1E3A5F] text-lg">
                  {item.name}
                </h3>
                <p className="text-gray-600 mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
