import { useState } from "react";
import IslandCard from "./IslandCard";

export default function IslandList({ islands }) {
  const [segment, setSegment] = useState("All");

  const displayed =
    segment === "All"
      ? islands
      : islands.filter((island) => island.segment === segment);

  const segments = ["All", ...new Set(islands.map((island) => island.segment))];

  const avgStay = displayed.length
    ? (
        displayed.reduce((sum, island) => sum + island.avgStay, 0) /
        displayed.length
      ).toFixed(1)
    : 0;

  return (
    <>
      <select onChange={(e) => setSegment(e.target.value)} value={segment}>
        {segments.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <div className="grid">
        {displayed.map((island) => (
          <IslandCard key={island.id} {...island} />
        ))}
      </div>

      <div className="summary-card">
        <p>Average stay: {avgStay} days</p>
      </div>
    </>
  );
}