import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Amenities from "../components/Amenities";
import SpecialOffer from "../components/SpecialOffer";
import CTA from "../components/CTA";

function Home() {
  const [property, setProperty] = useState(null);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const response = await fetch("http://localhost:3000/properties");
        const data = await response.json();

        const oahuProperty =
          data.find((item) => item.name === "Malama Waikiki Resort") || data[0];

        setProperty(oahuProperty);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    }

    fetchProperty();
  }, []);

  if (!property) {
    return <p className="loading">Loading resort information...</p>;
  }

  return (
    <main>
      <Hero property={property} />
      <About property={property} />
      <Amenities amenities={property.amenities} />
      <SpecialOffer />
      <CTA />
    </main>
  );
}

export default Home;