import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  return (
    <section className="py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl font-bold text-blue-900 tracking-tight mb-4">Why Choose Us</h2>
          <p className="text-gray-600">Excellence in Education, Leadership in Innovation</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-blue-800 mb-4 tracking-tight">Academic Excellence</h3>
            <p className="text-gray-600">Innovative teaching methods and personalized learning approaches that inspire academic achievement.</p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-blue-800 mb-4 tracking-tight">Holistic Development</h3>
            <p className="text-gray-600">Comprehensive programs fostering intellectual, physical, and emotional growth.</p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-blue-800 mb-4 tracking-tight">Modern Facilities</h3>
            <p className="text-gray-600">State-of-the-art infrastructure designed to enhance the learning experience.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;