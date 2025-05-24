
import Head from 'next/head';
import Apple from "./LandingPage/Apple";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sunrise International Public School, RAMGARH</title>
        <meta name="description" content="Sunrise International Public School is a top CBSE school in RAMGARH, offering quality education with experienced faculty and excellent infrastructure." />
        <meta name="keywords" content="Sunrise International Public School, Nechhwa school, CBSE school, best school in Nechhwa, Rajasthan education" />
        <meta name="author" content="Sunrise Education Team" />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Sunrise International Public School, RAMGARH" />
        <meta property="og:description" content="Visit Sunrise International Public School for the best learning environment in Nechhwa." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sunriseinternationalpublicschool.in" />
        <meta property="og:image" content="https://www.sunriseinternationalpublicschool.in/images/pr.jpg" />


        {/* Mobile responsive */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Apple />
    </>
  );
}
