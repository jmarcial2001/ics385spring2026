import { useState } from "react";
import Dashboard from "./Dashboard";
import "./App.css";

// Week 13A island cards code kept here for reference in case you need it later
/*
import IslandList from "./IslandList";

const islands = [
  {
    id: 1,
    name: "Maui",
    nickname: "Valley Isle",
    segment: "Honeymoon",
    avgStay: 6.2,
    img: "https://picsum.photos/300/200?random=1",
  },
  {
    id: 2,
    name: "O'ahu",
    nickname: "Gathering Place",
    segment: "First-time",
    avgStay: 4.8,
    img: "https://picsum.photos/300/200?random=2",
  },
  {
    id: 3,
    name: "Kaua'i",
    nickname: "Garden Isle",
    segment: "Eco-tourist",
    avgStay: 7.1,
    img: "https://picsum.photos/300/200?random=3",
  },
  {
    id: 4,
    name: "Hawai'i",
    nickname: "Big Island",
    segment: "Adventure",
    avgStay: 8.3,
    img: "https://picsum.photos/300/200?random=4",
  },
  {
    id: 5,
    name: "Moloka'i",
    nickname: "Friendly Isle",
    segment: "Cultural",
    avgStay: 5.4,
    img: "https://picsum.photos/300/200?random=5",
  },
];
*/

function App() {
  const [selectedIsland, setSelectedIsland] = useState("Oahu");

  return (
    <div className="app">
      <h1>Malama Waikiki Resort</h1>
      <p style={{ textAlign: "center", marginTop: "-10px", marginBottom: "20px" }}>
        Visitor Statistics Dashboard
      </p>

      <select
        value={selectedIsland}
        onChange={(e) => setSelectedIsland(e.target.value)}
      >
        <option value="Oahu">Oahu</option>
        <option value="Maui">Maui</option>
        <option value="Kauai">Kauai</option>
        <option value="Hawaii">Hawaii</option>
      </select>

      <Dashboard selectedIsland={selectedIsland} />
    </div>
  );
}

export default App;