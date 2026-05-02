function Amenities({ amenities }) {
  return (
    <section className="section">
      <h2>Amenities</h2>

      <div className="card-grid">
        {amenities.map((amenity, index) => (
          <div className="card" key={index}>
            <h3>{amenity}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Amenities;