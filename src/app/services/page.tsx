import type { Metadata } from "next";
import Link from "next/link";
import {
  FaMoneyBillWave,
  FaChartLine,
  FaShieldAlt,
  FaLightbulb,
  FaHandshake,
  FaUsers,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our bill reduction, debt management, credit repair, and financial coaching services.",
};

const services = [
  {
    icon: FaMoneyBillWave,
    title: "Bill Negotiation",
    description:
      "Our expert negotiators contact your service providers on your behalf to secure lower rates. We handle cable, internet, phone, insurance, medical bills, and more.",
    features: [
      "Cable & Internet bill reduction",
      "Phone plan optimization",
      "Insurance premium negotiation",
      "Medical bill reduction",
      "Subscription audit & cancellation",
    ],
    savings: "Average savings: $150/month",
  },
  {
    icon: FaChartLine,
    title: "Debt Management",
    description:
      "We create personalized debt management plans that help you pay off debt faster while reducing interest rates and eliminating late fees.",
    features: [
      "Customized repayment plans",
      "Interest rate negotiation",
      "Debt consolidation guidance",
      "Late fee removal assistance",
      "Progress tracking dashboard",
    ],
    savings: "Average debt reduction: 30-50%",
  },
  {
    icon: FaShieldAlt,
    title: "Credit Repair",
    description:
      "Our credit repair specialists work to remove inaccurate items from your credit reports and help you build a stronger credit profile.",
    features: [
      "Free credit report analysis",
      "Dispute inaccurate items",
      "Credit score monitoring",
      "Personalized improvement plan",
      "Identity theft protection tips",
    ],
    savings: "Average credit score increase: 80+ points",
  },
  {
    icon: FaLightbulb,
    title: "Budget Planning",
    description:
      "Get a personalized budget that works for your lifestyle. We help you track spending, identify waste, and build healthy financial habits.",
    features: [
      "Income & expense analysis",
      "Personalized budget creation",
      "Spending habit identification",
      "Savings goal setting",
      "Monthly budget reviews",
    ],
    savings: "Average monthly savings: $300+",
  },
  {
    icon: FaHandshake,
    title: "Financial Coaching",
    description:
      "One-on-one coaching sessions with certified financial experts who guide you toward your financial goals with actionable strategies.",
    features: [
      "Bi-weekly coaching sessions",
      "Goal setting & accountability",
      "Investment basics education",
      "Retirement planning",
      "Emergency fund building",
    ],
    savings: "Long-term wealth building",
  },
  {
    icon: FaUsers,
    title: "Family Financial Plans",
    description:
      "Comprehensive financial planning for the whole family, including education savings, family budgets, and multi-generational wealth building.",
    features: [
      "Education savings (529 plans)",
      "Family budget optimization",
      "Estate planning basics",
      "Kid-friendly money education",
      "Multi-income household strategies",
    ],
    savings: "Secure your family's future",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-pattern bg-gradient-to-br from-blue-50 to-green-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive financial services designed to reduce your bills, manage
            debt, and build lasting financial freedom.
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                      <service.icon className="text-primary text-2xl" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 text-lg mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <FaCheckCircle className="text-secondary shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 inline-block">
                    <span className="text-secondary font-semibold">
                      {service.savings}
                    </span>
                  </div>
                </div>
                <div
                  className={`bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-12 flex items-center justify-center ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <service.icon className="text-primary text-8xl opacity-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-bg py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us today for a free consultation and bill analysis.
          </p>
          <Link
            href="/contact"
            className="bg-white text-primary px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg inline-flex items-center gap-2"
          >
            Get Started <FaArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
