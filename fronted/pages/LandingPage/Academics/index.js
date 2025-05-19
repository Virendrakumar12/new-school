import React from 'react';
import { FaChalkboardTeacher, FaGraduationCap, FaRunning, FaFlask, FaPalette, FaUserShield } from 'react-icons/fa';

const Academics = () => {
  return (
    <div className="pt-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-4 text-blue-900">Academic Excellence</h1>
      <p className="text-center text-gray-600 text-lg mb-12">Empowering students with knowledge, creativity, and values.</p>

      {/* Curriculum Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-blue-800">Our Curriculum</h2>
        <p className="text-gray-700 mb-8 leading-relaxed">
          Our curriculum is designed to challenge and inspire students. It balances academic rigor with a holistic approach, promoting both knowledge and personal growth.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-blue-700">Primary Education (Grades 1–5)</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Foundation in core subjects</li>
              <li>Interactive learning techniques</li>
              <li>Regular progress evaluations</li>
              <li>Focus on moral and social values</li>
            </ul>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-blue-700">Secondary Education (Grades 6–10)</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Advanced academic streams</li>
              <li>Career and college preparation</li>
              <li>Critical thinking & leadership</li>
              <li>Participation in clubs and debates</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Special Programs */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-blue-800">Special Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
            <FaFlask className="text-3xl text-blue-500 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-blue-700">STEM Excellence</h3>
            <p className="text-gray-700">Advanced learning in science, technology, engineering & mathematics.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
            <FaPalette className="text-3xl text-pink-500 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-blue-700">Arts Program</h3>
            <p className="text-gray-700">Fostering creativity through visual arts, music, dance, and theatre.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
            <FaRunning className="text-3xl text-green-500 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-blue-700">Sports Academy</h3>
            <p className="text-gray-700">Skill-based coaching with an emphasis on discipline and team spirit.</p>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-6 text-blue-800">Our Faculty</h2>
        <p className="text-gray-700 mb-8 leading-relaxed">
          Our faculty members are mentors and motivators who ensure our students receive guidance, care, and the best academic support possible.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
            <FaChalkboardTeacher className="text-3xl text-yellow-500 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-blue-700">Experienced Educators</h3>
            <p className="text-gray-700">Most faculty have 10+ years of teaching expertise in their fields.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
            <FaGraduationCap className="text-3xl text-purple-500 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-blue-700">Ongoing Development</h3>
            <p className="text-gray-700">Teachers attend regular workshops and certifications.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
            <FaUserShield className="text-3xl text-red-500 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-blue-700">Student Support</h3>
            <p className="text-gray-700">Dedicated counselors, support staff, and mentors for holistic growth.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;
