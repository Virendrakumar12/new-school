import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);          // Mobile menu toggle
  const [loginOpen, setLoginOpen] = useState(false);    // Toggle to show login options
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
    setIsOpen(false);
    setLoginOpen(false);  // close login submenu when navigating
  };

  return (
    <nav className="fixed w-full z-50 bg-white/95 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => handleNavigation("/")}
            className="text-2xl font-bold text-blue-900 tracking-tight"
          >
            Sun Rise
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <button onClick={() => router.push("/LandingPage/Home")} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Home</button>
            <button onClick={() => router.push("/LandingPage/About")} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">About</button>
            <button onClick={() => router.push("/LandingPage/Academics")} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Academics</button>
            <button onClick={() => router.push("/LandingPage/Admissions")} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Admissions</button>
            <button onClick={() => router.push("/LandingPage/Contact")} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Contact</button>

            {/* Login dropdown toggle */}
            <div className="relative">
              <button
                onClick={() => setLoginOpen(!loginOpen)}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                Login
              </button>

              {/* Login submenu */}
              {loginOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-50 border border-gray-200">
                  <button
                    onClick={() => handleNavigation("/StudentLogin")}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                  >
                    StudentLogin
                  </button>
                  <button
                    onClick={() => handleNavigation("/ParentLogin")}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                  >
                    ParentLogin
                  </button>
                  <button
                    onClick={() => handleNavigation("/TeacherLogin")}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                  >
                    TeacherLogin
                  </button>
                  <button
                    onClick={() => handleNavigation("/Login")}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                  >
                    SchoolLogin
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 z-50 relative"
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } md:hidden fixed top-[4rem] left-0 w-full bg-white py-4 shadow-lg transition-transform transition-opacity transform duration-300 ease-in-out z-40`}
      >
        <div className="container mx-auto px-8 space-y-4">
          <button onClick={() => handleNavigation("/LandingPage/Home")} className="block text-gray-600 hover:text-blue-600 transition-colors duration-300">Home</button>
          <button onClick={() => handleNavigation("/LandingPage/About")} className="block text-gray-600 hover:text-blue-600 transition-colors duration-300">About</button>
          <button onClick={() => handleNavigation("/LandingPage/Academics")} className="block text-gray-600 hover:text-blue-600 transition-colors duration-300">Academics</button>
          <button onClick={() => handleNavigation("/LandingPage/Admissions")} className="block text-gray-600 hover:text-blue-600 transition-colors duration-300">Admissions</button>
          <button onClick={() => handleNavigation("/LandingPage/Contact")} className="block text-gray-600 hover:text-blue-600 transition-colors duration-300">Contact</button>

          {/* Mobile Login toggle */}
          <div>
            <button
              onClick={() => setLoginOpen(!loginOpen)}
              className="block text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              Login
            </button>

            {/* Mobile login options */}
            {loginOpen && (
              <div className="pl-4 mt-2 space-y-2">
                <button onClick={() => handleNavigation("/StudentLogin")} className="block text-gray-600 hover:text-blue-600 transition-colors duration-300">StudentLogin</button>
                <button onClick={() => handleNavigation("/ParentLogin")} className="block text-gray-600 hover:text-blue-600 transition-colors duration-300">ParentLogin</button>
                <button onClick={() => handleNavigation("/TeacherLogin")} className="block text-gray-600 hover:text-blue-600 transition-colors duration-300">TeacherLogin</button>
                <button onClick={() => handleNavigation("/Login")} className="block text-gray-600 hover:text-blue-600 transition-colors duration-300">SchoolLogin</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
