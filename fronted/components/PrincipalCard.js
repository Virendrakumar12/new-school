import React, { useState, useEffect } from 'react';
import Image from 'next/image';
const PrincipalCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Entrance animation trigger
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-16 relative">
      <div className={`max-w-4xl mx-auto px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-white rounded-2xl hover:shadow-2xl transition-shadow duration-500 shadow-xl p-8 md:flex md:items-center gap-8 group">
          
          {/* Principal Photo */}
          <div className="flex-shrink-0 mb-6 md:mb-0 relative">
            <div className="rounded-full border-4 border-blue-500 p-1 hover:border-blue-700 transition duration-300 transform hover:scale-110 shadow-md hover:shadow-xl cursor-pointer">
              <Image
                src="/images/pr.jpg"
                alt="Principal"
                width={500} height={300} 
                onClick={handleImageClick}
                className="w-40 h-40 rounded-full object-cover transition-transform duration-500"
              />
              {/* Glowing Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-pulse z-[-1]"></div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-2 relative inline-block">
              CHHOTAN MAHTO
              <span className="block h-1 bg-blue-400 mt-1 w-16 group-hover:w-24 transition-all duration-300 rounded-full"></span>
            </h2>
            <p className="text-blue-700 font-semibold mb-4 italic tracking-wide">Principal, Sunrise Public School</p>
            <p className="text-gray-700 leading-relaxed transition-opacity duration-500 group-hover:opacity-90">
              With over 10 years of experience in educational leadership, CHHOTAN MAHTO is committed to nurturing young minds and fostering an environment of academic excellence and holistic development. His vision is to empower students to become responsible global citizens with a strong moral foundation.
            </p>
          </div>
        </div>
      </div>

      {/* Modal Preview */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="animate-bounce-in">
            <img
              src="/images/pr.jpg"
              alt="Principal Full"
              className="max-w-full max-h-full rounded-xl shadow-2xl border-4 border-white"
            />
          </div>
          <button
            className="absolute top-4 right-4 text-white text-4xl font-extrabold hover:text-red-500 transition-transform hover:scale-125"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
      )}

      {/* Custom animation class for modal image */}
      <style>
        {`
          .animate-bounce-in {
            animation: bounceIn 0.4s ease-out forwards;
          }
          @keyframes bounceIn {
            0% { transform: scale(0.6); opacity: 0; }
            60% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </section>
  );
};

export default PrincipalCard;
