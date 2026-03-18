import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  DollarSign,
  ChevronDown,
  ChevronUp,
  CheckCircle,
} from "lucide-react";

const termOptions = [36, 48, 60, 72, 84];

const incomeRanges = [
  "Under $25,000",
  "$25,000 - $49,999",
  "$50,000 - $74,999",
  "$75,000 - $99,999",
  "$100,000 - $149,999",
  "$150,000+",
];

const employmentStatuses = [
  "Employed Full-Time",
  "Employed Part-Time",
  "Self-Employed",
  "Retired",
  "Student",
  "Other",
];

const faqItems = [
  {
    question: "What credit score do I need?",
    answer:
      "We work with all credit levels, from excellent to challenged credit. Our finance team partners with a wide network of lenders to find the best rate available for your situation. Don't let your credit score stop you from applying — we're here to help.",
  },
  {
    question: "Can I finance a used vehicle?",
    answer:
      "Yes, we offer financing on all vehicles in our inventory, including pre-owned and certified pre-owned models. Rates and terms may vary based on the vehicle's age, mileage, and your credit profile.",
  },
  {
    question: "What documents do I need?",
    answer:
      "Valid driver's license, proof of income (two recent pay stubs or tax returns), proof of insurance, and proof of residence (utility bill or bank statement). Additional documents may be requested depending on your situation.",
  },
  {
    question: "Do you offer lease options?",
    answer:
      "Yes, we offer competitive lease programs on select new vehicles. Leasing can provide lower monthly payments and the flexibility to drive a new vehicle every few years. Ask our finance team about current lease specials.",
  },
  {
    question: "Can I apply online?",
    answer:
      "Yes, use our pre-approval form above to get started from the comfort of your home. The process takes just a few minutes, and a finance specialist will follow up with you to discuss your options.",
  },
  {
    question: "What about trade-ins?",
    answer:
      "We accept trade-ins and apply the value directly to your purchase, reducing the amount you need to finance. Bring your vehicle in for a free appraisal, or use our online trade-in estimator for a quick quote.",
  },
];

const lenders = [
  "Chase Auto",
  "Capital One Auto",
  "Wells Fargo",
  "Bank of America",
  "Ally Financial",
  "Austin Telco FCU",
];

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-[#1B2A4A] text-lg pr-4">
          {item.question}
        </span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-[#1B2A4A] flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#1B2A4A] flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-4 text-gray-600 leading-relaxed">
          {item.answer}
        </div>
      )}
    </div>
  );
}

export default function FinancePage() {
  // Calculator state
  const [vehiclePrice, setVehiclePrice] = useState(30000);
  const [downPayment, setDownPayment] = useState(3000);
  const [tradeIn, setTradeIn] = useState(0);
  const [interestRate, setInterestRate] = useState(6.9);
  const [loanTerm, setLoanTerm] = useState(72);

  // Pre-approval form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    annualIncome: "",
    employmentStatus: "",
    desiredVehicle: "",
    comments: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const calculations = useMemo(() => {
    const principal = vehiclePrice - downPayment - tradeIn;
    if (principal <= 0) {
      return { monthlyPayment: 0, totalFinanced: 0, totalInterest: 0, totalCost: 0 };
    }
    const monthlyRate = interestRate / 100 / 12;
    const n = loanTerm;
    let monthlyPayment;
    if (monthlyRate === 0) {
      monthlyPayment = principal / n;
    } else {
      monthlyPayment =
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
        (Math.pow(1 + monthlyRate, n) - 1);
    }
    const totalCost = monthlyPayment * n;
    const totalInterest = totalCost - principal;
    return {
      monthlyPayment,
      totalFinanced: principal,
      totalInterest,
      totalCost,
    };
  }, [vehiclePrice, downPayment, tradeIn, interestRate, loanTerm]);

  const formatCurrency = (val) =>
    val.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-[#1B2A4A]">Finance</h1>
        </div>
      </div>

      {/* Payment Calculator */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1B2A4A] text-center mb-10">
            Payment Calculator
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1B2A4A] mb-1">
                  Vehicle Price
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={vehiclePrice}
                    onChange={(e) => setVehiclePrice(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-gray-300 text-[#1B2A4A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B2A4A] mb-1">
                  Down Payment
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-gray-300 text-[#1B2A4A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B2A4A] mb-1">
                  Trade-in Value
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={tradeIn}
                    onChange={(e) => setTradeIn(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-gray-300 text-[#1B2A4A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B2A4A] mb-1">
                  Interest Rate (APR %)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-[#1B2A4A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B2A4A] mb-2">
                  Loan Term (months)
                </label>
                <div className="flex flex-wrap gap-2">
                  {termOptions.map((term) => (
                    <button
                      key={term}
                      onClick={() => setLoanTerm(term)}
                      className={`px-5 py-2 rounded-lg font-medium transition-colors ${
                        loanTerm === term
                          ? "bg-[#1B2A4A] text-white"
                          : "bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gray-50 rounded-xl p-8 flex flex-col justify-center">
              <div className="text-center mb-8">
                <p className="text-gray-500 text-sm uppercase tracking-wide mb-1">
                  Estimated Monthly Payment
                </p>
                <p className="text-5xl md:text-6xl font-bold text-[#D4A843]">
                  {formatCurrency(calculations.monthlyPayment)}
                </p>
                <p className="text-gray-400 text-sm mt-1">per month</p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Total Amount Financed</span>
                  <span className="font-semibold text-[#1B2A4A]">
                    {formatCurrency(calculations.totalFinanced)}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Total Interest Paid</span>
                  <span className="font-semibold text-[#1B2A4A]">
                    {formatCurrency(calculations.totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Cost</span>
                  <span className="font-semibold text-[#D4A843]">
                    {formatCurrency(calculations.totalCost)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Pre-Approved Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
                Get Pre-Approved in Minutes
              </h2>
            </div>

            {formSubmitted ? (
              <div
                className="bg-white rounded-xl p-10 text-center shadow-lg"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#1B2A4A] mb-3">
                  Thank You!
                </h3>
                <p className="text-gray-600 text-lg">
                  Your pre-approval application has been received. A finance
                  specialist will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleFormSubmit}
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
                      value={formData.firstName}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]"
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
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Annual Income
                    </label>
                    <select
                      name="annualIncome"
                      value={formData.annualIncome}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B2A4A] bg-white"
                    >
                      <option value="">Select range</option>
                      {incomeRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employment Status
                    </label>
                    <select
                      name="employmentStatus"
                      value={formData.employmentStatus}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B2A4A] bg-white"
                    >
                      <option value="">Select status</option>
                      {employmentStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Desired Vehicle
                  </label>
                  <input
                    type="text"
                    name="desiredVehicle"
                    value={formData.desiredVehicle}
                    onChange={handleFormChange}
                    placeholder="e.g., 2024 Toyota Camry"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Comments
                  </label>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleFormChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#1B2A4A] text-white font-semibold rounded-lg hover:bg-[#2d4a7a] transition-colors text-lg"
                >
                  Submit Pre-Approval Application
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">
                  Submitting this form does not affect your credit score. A soft
                  inquiry may be performed for pre-qualification purposes. A hard
                  credit check will only occur with your consent during the final
                  financing process.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Financing FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              Financing FAQ
            </h2>
            <p className="text-gray-600">
              Answers to common questions about financing at Charlie Bell Auto.
            </p>
          </div>
          <div
            className="space-y-3"
          >
            {faqItems.map((item, index) => (
              <div key={index}>
                <FAQItem item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lender Logos Strip */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div>
            <h2 className="text-2xl font-bold text-[#1B2A4A] text-center mb-8">
              Our Lending Partners
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {lenders.map((lender) => (
                <div
                  key={lender}
                  className="bg-white rounded-lg border border-gray-200 px-4 py-6 flex items-center justify-center shadow-sm"
                >
                  <span className="font-semibold text-[#1B2A4A] text-sm text-center">
                    {lender}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
