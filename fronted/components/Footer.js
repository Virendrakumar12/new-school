import React from 'react';
import { useRouter } from 'next/router';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* School Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Sun Rise International public</h3>
            <p className="text-gray-400 mb-2">Empowering minds, Building futures</p>
            <address className="text-gray-400 not-italic text-sm leading-relaxed">
              NH33 ROAD NEAR DAMODAR RIVER <br />
                    KAITHA RAMGARH<br />
                    JHARKHAND,INDIA<br />
              Phone: <a href="tel:5551234567" className="hover:text-white">(555) 123-4567</a><br />
              Email: <a href="mailto:info@sunriseschool.edu" className="hover:text-white">info@sunriseschool.edu</a>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm flex flex-col">
              <button onClick={() => router.push('/LandingPage/About')} className="text-left text-gray-400 hover:text-white transition-colors">
                About Us
              </button>
              <button onClick={() => router.push('/LandingPage/Academics')} className="text-left text-gray-400 hover:text-white transition-colors">
                Academics
              </button>
              <button onClick={() => router.push('/LandingPage/Admissions')} className="text-left text-gray-400 hover:text-white transition-colors">
                Admissions
              </button>
              <button onClick={() => router.push('/LandingPage/Home')} className="text-left text-gray-400 hover:text-white transition-colors">
                Events
              </button>
              <button onClick={() => router.push('/LandingPage/Contact')} className="text-left text-gray-400 hover:text-white transition-colors">
                Contact
              </button>
            </div>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 text-xl">
              <a href="#" aria-label="Facebook" className="hover:text-blue-400 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-pink-400 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-blue-300 transition-colors">
                <FaLinkedinIn />
              </a>
               <a href="#" aria-label="LinkedIn" className="hover:text-blue-300 transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Stay updated with school news and events.</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} <span className="text-white">Sun Rise International</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
