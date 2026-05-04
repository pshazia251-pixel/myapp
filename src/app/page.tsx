import Link from "next/link";
import {
  FaMoneyBillWave,
  FaChartLine,
  FaShieldAlt,
  FaUsers,
  FaLightbulb,
  FaHandshake,
  FaStar,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { getSortedPostsData } from "@/lib/blog";

const services = [
  {
    icon: FaMoneyBillWave,
    title: "Bill Negotiation",
    description:
      "We negotiate with service providers to lower your monthly bills including cable, internet, phone, and insurance.",
  },
  {
    icon: FaChartLine,
    title: "Debt Management",
    description:
      "Professional debt management plans to help you pay off debt faster and save on interest charges.",
  },
  {
    icon: FaShieldAlt,
    title: "Credit Repair",
    description:
      "Improve your credit score with our expert guidance and proven strategies for credit repair.",
  },
  {
    icon: FaLightbulb,
    title: "Budget Planning",
    description:
      "Personalized budget plans tailored to your income and goals to help you save more every month.",
  },
  {
    icon: FaHandshake,
    title: "Financial Coaching",
    description:
      "One-on-one financial coaching to build healthy money habits and achieve your financial goals.",
  },
  {
    icon: FaUsers,
    title: "Family Plans",
    description:
      "Comprehensive family financial plans covering education, savings, and long-term wealth building.",
  },
];

const stats = [
  { number: "$2.5M+", label: "Saved for Clients" },
  { number: "10,000+", label: "Happy Customers" },
  { number: "50+", label: "States Served" },
  { number: "98%", label: "Satisfaction Rate" },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Texas",
    text: "BillFreeUSA saved me over $300 per month on my bills! Their team negotiated better rates on my cable, internet, and insurance. Highly recommended!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    location: "California",
    text: "I was drowning in debt and didn't know where to start. BillFreeUSA created a manageable plan and now I'm debt-free in just 2 years!",
    rating: 5,
  },
  {
    name: "Emily Davis",
    location: "New York",
    text: "The budget planning service changed my life. I went from living paycheck to paycheck to saving $500 a month. Thank you BillFreeUSA!",
    rating: 5,
  },
];

export default function Home() {
  const recentPosts = getSortedPostsData().slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-pattern bg-gradient-to-br from-blue-50 to-green-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Live <span className="text-primary-light">Bill Free</span> in the{" "}
              <span className="text-secondary">USA</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Stop overpaying on your monthly bills. We help Americans save thousands
              every year by negotiating better rates, managing debt, and building
              financial freedom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-colors font-semibold text-lg inline-flex items-center justify-center gap-2"
              >
                Start Saving Today <FaArrowRight />
              </Link>
              <Link
                href="/services"
                className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="gradient-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How We Help You Save
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive services are designed to reduce your bills and put
              more money back in your pocket.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow group"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <service.icon className="text-primary text-2xl group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to start saving money today
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Share Your Bills",
                description:
                  "Upload or tell us about your current monthly bills. We analyze every line item for savings opportunities.",
              },
              {
                step: "02",
                title: "We Negotiate",
                description:
                  "Our experts negotiate with your service providers to get you the best possible rates and remove unnecessary charges.",
              },
              {
                step: "03",
                title: "You Save",
                description:
                  "Start enjoying lower bills immediately. Most clients see savings of 20-40% on their monthly expenses.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why Choose BillFreeUSA?
              </h2>
              <div className="space-y-4">
                {[
                  "No upfront costs - we only charge when we save you money",
                  "Average savings of $200+ per month for our clients",
                  "Experienced financial experts on your side",
                  "Secure and confidential - your data is protected",
                  "Free initial consultation and bill analysis",
                  "Money-back guarantee if we can't find savings",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <FaCheckCircle className="text-secondary text-xl shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold mt-8"
              >
                Get Free Analysis <FaArrowRight />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8 lg:p-12">
              <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Monthly Savings Example</h4>
                <div className="space-y-3">
                  {[
                    { item: "Cable/Internet", savings: "$45" },
                    { item: "Phone Bill", savings: "$30" },
                    { item: "Insurance", savings: "$85" },
                    { item: "Subscriptions", savings: "$25" },
                    { item: "Utilities", savings: "$35" },
                  ].map((row) => (
                    <div key={row.item} className="flex justify-between text-gray-700">
                      <span>{row.item}</span>
                      <span className="font-semibold text-secondary">{row.savings}/mo</span>
                    </div>
                  ))}
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-bold text-gray-900">Total Savings</span>
                    <span className="font-bold text-secondary text-lg">$220/mo</span>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-600 font-medium">
                That&apos;s <span className="text-secondary font-bold text-2xl">$2,640</span> saved per year!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied customers saving money every month
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-xl p-8 shadow-md"
              >
                <div className="flex mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Latest from Our Blog
              </h2>
              <p className="text-xl text-gray-600">
                Expert tips and guides to help you save money
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                    <span className="text-4xl">{post.emoji || "📰"}</span>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-primary-light font-medium mb-2">
                      {post.category}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-light transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 text-sm text-gray-500">{post.date}</div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors text-lg"
              >
                View All Posts <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="gradient-bg py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get a free bill analysis today and discover how much you could save every month.
          </p>
          <Link
            href="/contact"
            className="bg-white text-primary px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg inline-flex items-center gap-2"
          >
            Get Free Consultation <FaArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
