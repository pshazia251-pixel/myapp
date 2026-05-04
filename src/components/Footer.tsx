import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-white">
                Bill<span className="text-blue-400">Free</span>
                <span className="text-green-400">USA</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Helping Americans save money and achieve financial freedom by reducing monthly bills.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="hover:text-white transition-colors">Bill Negotiation</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Debt Management</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Budget Planning</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Credit Repair</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Financial Coaching</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-400 shrink-0" />
                <span>info@billfreeusa.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-blue-400 shrink-0" />
                <span>1-800-BILLFREE</span>
              </li>
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-blue-400 shrink-0 mt-1" />
                <span>New York, NY, USA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} BillFreeUSA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
