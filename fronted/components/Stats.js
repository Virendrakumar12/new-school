import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  const stats = [
    { number: '300+', label: 'Students', suffix: '' },
    { number: '15+', label: 'Expert Teachers', suffix: '' },
    { number: '80', label: 'Academic Success Rate', suffix: '%' },
    { number: '10', label: 'Years of Excellence', suffix: '+' }
  ];

  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Success in Numbers</h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">Celebrating our achievements and continuous growth in educational excellence.</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold mb-2">
                {stat.number}{stat.suffix}
              </div>
              <p className="text-blue-100 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;