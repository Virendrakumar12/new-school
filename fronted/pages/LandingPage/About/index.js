import React from 'react';
import Head from 'next/head';

const About = () => {
  return (
    <>
      <Head>
        <title>About Us - Sunrise International Public School</title>
        <meta
          name="description"
          content="Learn about the mission, vision, history, and core values of Sunrise International Public School."
        />
        <meta name="keywords" content="Sunrise International Public School, about us, school history, mission, vision, values" />
        <meta property="og:title" content="About Us - Sunrise International Public School" />
        <meta
          property="og:description"
          content="Discover the story and values behind Sunrise International Public School, committed to excellence in education."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sunriseinternationalpublicschool.in/about" />
        <meta property="og:image" content="https://www.sunriseinternationalpublicschool.in/images/pr.jpg" />
      </Head>

      <div className="pt-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto bg-gradient-to-b from-white via-blue-50 to-white">
        <h1 className="text-4xl font-bold text-red-700 text-center mb-12">About Our School</h1>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Our History</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Established in 2015, our school began as a modest institution with only 30 eager learners. 
            Over the years, through dedication and a passion for excellence, we’ve flourished into a leading 
            academic center, educating over 300 students from diverse communities across the region.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Our Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To become a center of educational excellence where young minds are transformed into 
            innovative thinkers, lifelong learners, and compassionate leaders.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Our Mission</h2>
          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            We aim to offer a well-rounded education that empowers students to succeed academically, grow personally, 
            and make meaningful contributions to society. We achieve this by focusing on:
          </p>
          <ul className="list-disc pl-6 text-gray-700 text-lg space-y-2">
            <li>Academic excellence through innovative teaching methods</li>
            <li>Holistic character development and value-based education</li>
            <li>Integrating technology and modern learning tools</li>
            <li>Active community involvement and environmental awareness</li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-blue-800">Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Excellence', desc: 'Striving for the highest standards in every endeavor.' },
              { title: 'Integrity', desc: 'Upholding honesty, ethics, and strong moral character.' },
              { title: 'Innovation', desc: 'Encouraging creativity and embracing new ideas.' },
              { title: 'Respect', desc: 'Fostering a culture of kindness and empathy.' },
              { title: 'Responsibility', desc: 'Developing accountable and dependable individuals.' },
              { title: 'Teamwork', desc: 'Promoting collaboration for collective growth.' },
            ].map((value, idx) => (
              <div key={idx} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="pt-12 border-t mt-16 text-center">
          <p className="text-gray-600 text-lg">
            Join us in shaping the future—one student at a time.
          </p>
        </footer>
      </div>
    </>
  );
};

export default About;
