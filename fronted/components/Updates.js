import React from 'react';
import { motion } from 'framer-motion';

const Updates = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <h2 className="text-5xl font-bold text-blue-900 tracking-tight mb-6">Latest Updates</h2>
          <p className="text-xl text-gray-600">Stay informed about our school activities</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-blue-800 tracking-tight">News</h3>
            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 20 }}
                className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h4 className="text-xl font-bold text-blue-700 mb-2">Annual Exhibition</h4>
                <p className="text-gray-600">Showcasing innovative projects and creative achievements</p>
              </motion.div>
              <motion.div
                whileHover={{ x: 20 }}
                className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h4 className="text-xl font-bold text-blue-700 mb-2">Cultural Festival</h4>
                <p className="text-gray-600">Celebrating diversity through art, music, and dance</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-blue-800 tracking-tight">Upcoming Events</h3>
            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 20 }}
                className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h4 className="text-xl font-bold text-blue-700 mb-2">Parent-Teacher Meeting</h4>
                <p className="text-gray-600">Join us for our monthly progress discussion</p>
              </motion.div>
              <motion.div
                whileHover={{ x: 20 }}
                className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h4 className="text-xl font-bold text-blue-700 mb-2">Sports Day</h4>
                <p className="text-gray-600">Annual sports competition and athletic showcase</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Updates;