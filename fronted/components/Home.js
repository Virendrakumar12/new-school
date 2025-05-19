import React from 'react';
import { motion } from 'framer-motion';

const HomeComponent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-yellow-400/20"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">
              SUN RISE INTERNATIONAL PUBLIC SCHOOL
            </h1>
            <p className="text-xl text-blue-800 mb-8">
              Nurturing minds, Building futures, Creating leaders of tomorrow
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
              Explore More
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Academic Excellence */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-sky-50 shadow-md"
            >
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">Academic Excellence</h3>
              <p className="text-blue-800">Committed to providing world-class education with innovative teaching methods.</p>
            </motion.div>

            {/* Holistic Development */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-sky-50 shadow-md"
            >
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">Holistic Development</h3>
              <p className="text-blue-800">Focus on sports, arts, and cultural activities for well-rounded growth.</p>
            </motion.div>

            {/* Modern Infrastructure */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-sky-50 shadow-md"
            >
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">Modern Infrastructure</h3>
              <p className="text-blue-800">State-of-the-art facilities to support learning and development.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section className="py-16 bg-gradient-to-t from-sky-100 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">Latest Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* News Section */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">School News</h3>
              <ul className="space-y-4">
                <li className="p-4 hover:bg-sky-50 rounded-lg transition-colors duration-300">
                  <h4 className="font-semibold text-blue-800">Annual Day Celebration</h4>
                  <p className="text-blue-700">Join us for a spectacular showcase of talent!</p>
                </li>
                <li className="p-4 hover:bg-sky-50 rounded-lg transition-colors duration-300">
                  <h4 className="font-semibold text-blue-800">Science Exhibition</h4>
                  <p className="text-blue-700">Students present innovative projects</p>
                </li>
              </ul>
            </div>

            {/* Events Calendar */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">Upcoming Events</h3>
              <ul className="space-y-4">
                <li className="p-4 hover:bg-sky-50 rounded-lg transition-colors duration-300">
                  <h4 className="font-semibold text-blue-800">Parent-Teacher Meeting</h4>
                  <p className="text-blue-700">Date: JUNE 20, 2024</p>
                </li>
                <li className="p-4 hover:bg-sky-50 rounded-lg transition-colors duration-300">
                  <h4 className="font-semibold text-blue-800">Sports Day</h4>
                  <p className="text-blue-700">Date: March 21, 2026</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeComponent;