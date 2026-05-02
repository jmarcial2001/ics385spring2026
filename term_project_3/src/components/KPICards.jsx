function KPICards({ metrics }) {
  return (
    <section className="kpi-grid">
      <div className="kpi-card">
        <h3>Average Daily Rate</h3>
        <p>${metrics.adr}</p>
      </div>

      <div className="kpi-card">
        <h3>Occupancy Rate</h3>
        <p>{metrics.occupancy}%</p>
      </div>

      <div className="kpi-card">
        <h3>Average Stay</h3>
        <p>{metrics.avgStay} nights</p>
      </div>
    </section>
  );
}

export default KPICards;