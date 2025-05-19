import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "The teachers at Sun Rise International have been instrumental in my child's academic growth. Their dedication and innovative teaching methods make learning enjoyable.",
      author: "Sarah Johnson",
      role: "Parent"
    },
    {
      quote: "The school's focus on holistic development has helped me excel not just in academics, but also in sports and extracurricular activities.",
      author: "Michael Chen",
      role: "Student, Grade 12"
    },
    {
      quote: "We're impressed by the school's commitment to maintaining high academic standards while ensuring a supportive learning environment.",
      author: "David Wilson",
      role: "Parent"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">What Our Community Says</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Hear from our students and parents about their experience at Sun Rise International.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="mb-4 text-blue-600">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4 italic">{testimonial.quote}</p>
              <div>
                <p className="font-semibold text-blue-900">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;