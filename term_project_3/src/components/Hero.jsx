function Hero({ property }) {
  return (
    <section className="hero">
      <div className="hero-text">
        <h2>{property.name}</h2>
        <p>Classic Waikiki comfort with a warm local Hawaiian feel.</p>
        <button>Explore Your Stay</button>
      </div>

      <img src={property.imageURL} alt={`${property.name} in Waikiki`} />
    </section>
  );
}

export default Hero;