import React from 'react';
import { FaFileAlt, FaClipboardCheck, FaComments, FaQuestionCircle } from 'react-icons/fa';

const Admissions = () => {
  return (
    <div className="pt-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-4xl font-bold text-center mb-12">Admissions</h1>

      {/* Admission Process */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Admission Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md transition duration-300 hover:shadow-xl">
            <FaFileAlt className="text-blue-500 text-3xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Step 1: Application</h3>
            <p className="text-gray-700">Complete and submit the online application form with required documents.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md transition duration-300 hover:shadow-xl">
            <FaClipboardCheck className="text-green-500 text-3xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Step 2: Assessment</h3>
            <p className="text-gray-700">Schedule and complete the entrance assessment.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md transition duration-300 hover:shadow-xl">
            <FaComments className="text-purple-500 text-3xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Step 3: Interview</h3>
            <p className="text-gray-700">Parent and student interview with school administrators.</p>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Required Documents</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Completed application form</li>
            <li>Birth certificate</li>
            <li>Previous academic records</li>
            <li>Passport-size photographs</li>
            <li>Transfer certificate (if applicable)</li>
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaQuestionCircle className="text-indigo-500" /> Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-5">
            <h4 className="font-semibold text-lg mb-2">What age group do you accept?</h4>
            <p className="text-gray-700">We accept students starting from 5 years of age for Grade 1 and above.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-5">
            <h4 className="font-semibold text-lg mb-2">Is there an entrance test?</h4>
            <p className="text-gray-700">Yes, students are assessed through a basic entrance test before admission is confirmed.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-5">
            <h4 className="font-semibold text-lg mb-2">Are scholarships available?</h4>
            <p className="text-gray-700">Yes, merit-based scholarships are available. Contact the admissions office for details.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg p-6 text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Ready to Join Us?</h2>
        <p className="mb-4 text-gray-700">Start your journey with us today. Contact our admissions team for any help or guidance.</p>
        <a
          href="/contact"
          className="inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
        >
          Contact Admissions
        </a>
      </section>
    </div>
  );
};

export default Admissions;
