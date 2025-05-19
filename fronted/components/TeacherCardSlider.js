import React, { useEffect, useState, useRef } from 'react';

const teachers = [
  {
    name: 'Amit Sharma',
    subject: 'Mathematics',
    bio: 'Amit Sharma has been teaching Mathematics for over 12 years and is known for his engaging and interactive teaching style.',
    image: '/images/teachers/amit.jpg',
  },
  {
    name: 'Neha Verma',
    subject: 'Science',
    bio: 'Neha specializes in simplifying complex science concepts and has helped many students fall in love with the subject.',
    image: '/images/teachers/neha.jpg',
  },
  {
    name: 'Rahul Sinha',
    subject: 'English',
    bio: 'Rahul has a knack for literature and communication, inspiring students through poetry and storytelling.',
    image: '/images/teachers/rahul.jpg',
  },
  {
    name: 'Sunita Das',
    subject: 'Social Science',
    bio: 'Sunita connects history and civics with real-world events to create thoughtful global citizens.',
    image: '/images/teachers/sunita.jpg',
  },
  {
    name: 'Virendra Kumar',
    subject: 'Computer Science',
    bio: 'Virendra is passionate about technology and programming, making students industry-ready with hands-on projects.',
    image: '/images/teachers/vire.jpg',
  },
];

const TeacherCardSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSlide, setIsAutoSlide] = useState(true);
  const intervalRef = useRef(null);

  const nextTeacher = () => {
    setCurrentIndex((prev) => (prev + 1) % teachers.length);
    stopAutoSlide(); // Stop auto-slide on manual action
  };

  const prevTeacher = () => {
    setCurrentIndex((prev) => (prev - 1 + teachers.length) % teachers.length);
    stopAutoSlide(); // Stop auto-slide on manual action
  };

  const stopAutoSlide = () => {
    setIsAutoSlide(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isAutoSlide) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % teachers.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoSlide]);

  const teacher = teachers[currentIndex];

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
      <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
        Meet Our Teachers
      </h2>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between transition-all duration-500">
        <div className="md:w-1/2 text-left mb-6 md:mb-0 md:pr-6">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">
            {teacher.subject}
          </h3>
          <p className="text-gray-700 text-base">{teacher.bio}</p>
        </div>

        <div className="md:w-1/2 flex flex-col items-center">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-md hover:scale-105 transition-transform duration-300">
            <img
              src={teacher.image}
              alt={teacher.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-4 text-xl font-semibold text-blue-900">
            {teacher.name}
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-8">
        <button
          onClick={prevTeacher}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          ⬅️ Prev
        </button>
        <button
          onClick={nextTeacher}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Next ➡️
        </button>
      </div>
    </section>
  );
};

export default TeacherCardSlider;
