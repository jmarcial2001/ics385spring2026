export default function IslandCard({ name, nickname, segment, avgStay, img }) {
  return (
    <div className="island-card">
      <img src={img} alt={`${name} - ${nickname} island photo`} />
      <h2>{name}</h2>
      <p>{nickname}</p>
      <span>{segment}</span>
      <p>Average stay: {avgStay} days</p>
    </div>
  );
}