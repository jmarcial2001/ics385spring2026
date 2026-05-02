function About({ property }) {
  return (
    <section className="section">
      <h2>About the Resort</h2>
      <p>{property.description}</p>
      <p>
        Located in {property.location}, this {property.type} is designed for{" "}
        {property.targetSegment}.
      </p>
    </section>
  );
}

export default About;