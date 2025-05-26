
import Head from 'next/head';
import Apple from "./LandingPage/Apple";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sun Rise International Public School,kaitha Ramgarh</title>
        <meta name="description" content="Sunrise International Public School is a top CBSE school in RAMGARH, offering quality education with experienced faculty and excellent infrastructure." />
        <meta name="keywords" content="Sunrise International Public School, kaitha,ramhargh school, CBSE school, best school in RAMGARH" />
        <meta name="author" content="Sunrise Education Team" />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Sun Rise International Public School,Kaitha Ramgarh" />
        <meta property="og:description" content="Visit Sunrise International Public School for the best learning environment in RAMGARH." />
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
