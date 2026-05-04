"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaCalculator,
  FaBolt,
  FaWifi,
  FaMobileAlt,
  FaShieldAlt,
  FaCar,
  FaHome,
  FaTv,
  FaArrowRight,
  FaDollarSign,
} from "react-icons/fa";

interface BillItem {
  id: string;
  label: string;
  icon: React.ElementType;
  amount: number;
  savingsPercent: number;
}

const defaultBills: BillItem[] = [
  { id: "electric", label: "Electric Bill", icon: FaBolt, amount: 0, savingsPercent: 25 },
  { id: "internet", label: "Internet / WiFi", icon: FaWifi, amount: 0, savingsPercent: 30 },
  { id: "phone", label: "Phone Bill", icon: FaMobileAlt, amount: 0, savingsPercent: 20 },
  { id: "insurance", label: "Insurance", icon: FaShieldAlt, amount: 0, savingsPercent: 25 },
  { id: "car", label: "Car Insurance", icon: FaCar, amount: 0, savingsPercent: 20 },
  { id: "rent", label: "Rent / Mortgage", icon: FaHome, amount: 0, savingsPercent: 5 },
  { id: "cable", label: "Cable / Streaming", icon: FaTv, amount: 0, savingsPercent: 35 },
];

export default function CalculatorPage() {
  const [bills, setBills] = useState<BillItem[]>(defaultBills);
  const [showResults, setShowResults] = useState(false);

  const updateBill = (id: string, amount: number) => {
    setBills((prev) =>
      prev.map((bill) => (bill.id === id ? { ...bill, amount } : bill))
    );
  };

  const totalMonthly = bills.reduce((sum, b) => sum + b.amount, 0);
  const totalSavings = bills.reduce(
    (sum, b) => sum + (b.amount * b.savingsPercent) / 100,
    0
  );
  const totalYearlySavings = totalSavings * 12;
  const newMonthly = totalMonthly - totalSavings;

  const handleCalculate = () => {
    if (totalMonthly > 0) {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setBills(defaultBills);
    setShowResults(false);
  };

  return (
    <>
      {/* Hero */}
      <section className="hero-pattern bg-gradient-to-br from-blue-50 to-green-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaCalculator className="text-primary text-3xl" />
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Savings Calculator
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your current monthly bills below and see how much you could save
            with BillFreeUSA.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Enter Your Monthly Bills
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {bills.map((bill) => (
                <div
                  key={bill.id}
                  className="flex items-center gap-3 bg-gray-50 rounded-xl p-4"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <bill.icon className="text-primary text-lg" />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor={bill.id}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {bill.label}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        $
                      </span>
                      <input
                        type="number"
                        id={bill.id}
                        min="0"
                        step="1"
                        value={bill.amount || ""}
                        onChange={(e) =>
                          updateBill(bill.id, Math.max(0, Number(e.target.value)))
                        }
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent outline-none"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Current Total */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700">
                  Your Current Monthly Total
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  ${totalMonthly.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleCalculate}
                disabled={totalMonthly === 0}
                className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Calculate My Savings
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results */}
          {showResults && totalMonthly > 0 && (
            <div className="mt-8 space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                  <p className="text-sm text-red-600 font-medium mb-1">
                    Current Monthly Bills
                  </p>
                  <p className="text-3xl font-bold text-red-700">
                    ${totalMonthly.toFixed(2)}
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <p className="text-sm text-green-600 font-medium mb-1">
                    Estimated Monthly Savings
                  </p>
                  <p className="text-3xl font-bold text-green-700">
                    ${totalSavings.toFixed(2)}
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                  <p className="text-sm text-blue-600 font-medium mb-1">
                    New Monthly Total
                  </p>
                  <p className="text-3xl font-bold text-blue-700">
                    ${newMonthly.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Savings Breakdown
                </h3>
                <div className="space-y-3">
                  {bills
                    .filter((b) => b.amount > 0)
                    .map((bill) => {
                      const saved = (bill.amount * bill.savingsPercent) / 100;
                      return (
                        <div
                          key={bill.id}
                          className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <bill.icon className="text-primary" />
                            <span className="text-gray-700 font-medium">
                              {bill.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-500">
                              ${bill.amount.toFixed(2)}
                            </span>
                            <span className="text-secondary font-semibold">
                              Save ${saved.toFixed(2)}/mo
                            </span>
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                              -{bill.savingsPercent}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Yearly Savings */}
                <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <FaDollarSign className="text-secondary text-xl" />
                    <span className="text-lg font-medium text-gray-700">
                      Your Estimated Yearly Savings
                    </span>
                  </div>
                  <p className="text-5xl font-bold text-secondary mb-2">
                    ${totalYearlySavings.toFixed(2)}
                  </p>
                  <p className="text-gray-500">
                    That&apos;s like getting{" "}
                    <strong className="text-gray-700">
                      {(totalYearlySavings / 12).toFixed(0)} extra dollars
                    </strong>{" "}
                    every month!
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="gradient-bg rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Ready to Start Saving ${totalSavings.toFixed(2)}/month?
                </h3>
                <p className="text-blue-100 mb-6">
                  Our experts will negotiate your bills and find even more savings
                  opportunities.
                </p>
                <Link
                  href="/contact"
                  className="bg-white text-primary px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold inline-flex items-center gap-2"
                >
                  Get Free Consultation <FaArrowRight />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
