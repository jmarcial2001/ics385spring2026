import { useEffect, useState } from "react";

function SpecialOffer() {
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    async function fetchOffer() {
      try {
        const response = await fetch("http://localhost:3000/api/offers/active");
        const data = await response.json();
        setOffer(data);
      } catch (error) {
        console.error("Error fetching offer:", error);
      }
    }

    fetchOffer();
  }, []);

  if (!offer) {
    return null;
  }

  return (
    <section className="special-offer">
      <h2>{offer.title}</h2>
      <p>{offer.message}</p>
    </section>
  );
}

export default SpecialOffer;