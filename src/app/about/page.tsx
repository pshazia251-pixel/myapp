import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight, FaBullseye, FaEye, FaHeart } from "react-icons/fa";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about BillFreeUSA and our mission to help Americans achieve financial freedom.",
};

const team = [
  {
    name: "James Mitchell",
    role: "Founder & CEO",
    bio: "Former Wall Street analyst with 15+ years in personal finance. Founded BillFreeUSA to make financial freedom accessible to everyone.",
  },
  {
    name: "Lisa Rodriguez",
    role: "Head of Negotiations",
    bio: "Expert negotiator who has saved clients over $1M collectively. Specializes in insurance and telecom bill reduction.",
  },
  {
    name: "David Kim",
    role: "Financial Coach",
    bio: "Certified Financial Planner with a passion for teaching families how to build wealth and eliminate debt.",
  },
  {
    name: "Amanda Foster",
    role: "Credit Specialist",
    bio: "10+ years helping individuals repair their credit scores. Average client improvement of 80+ points.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-pattern bg-gradient-to-br from-blue-50 to-green-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About BillFreeUSA
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We&apos;re on a mission to help every American family save money and
            achieve true financial freedom.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg text-gray-600 space-y-4">
            <p>
              BillFreeUSA was founded with a simple belief: no American family should
              have to overpay for essential services. Every month, millions of
              households pay more than they need to for cable, internet, phone,
              insurance, and other bills.
            </p>
            <p>
              Our founder, James Mitchell, experienced this firsthand. After spending
              years on Wall Street, he realized that the same negotiation skills used
              in billion-dollar deals could help everyday families save hundreds of
              dollars per month on their bills.
            </p>
            <p>
              Since our founding, we&apos;ve helped over 10,000 families across all 50
              states save a combined $2.5 million on their monthly bills. Our team of
              expert negotiators, financial coaches, and credit specialists work
              tirelessly to ensure every client achieves their financial goals.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBullseye className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To empower American families to take control of their finances by
                eliminating unnecessary costs and building sustainable wealth.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaEye className="text-secondary text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                A world where every family has access to expert financial guidance and
                no one overpays for essential services.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-accent text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600">
                Transparency, integrity, and client success drive everything we do. We
                only succeed when our clients save money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              Experienced professionals dedicated to your financial success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-green-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-light font-medium text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-bg py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Join Our Growing Family
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start your journey to financial freedom today.
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
