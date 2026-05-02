function IslandSelector({ selectedIsland, setSelectedIsland }) {
  return (
    <div className="selector-card">
      <label>Select Island</label>

      <select
        value={selectedIsland}
        onChange={(event) => setSelectedIsland(event.target.value)}
      >
        <option value="Oahu">Oahu</option>
        <option value="Maui">Maui</option>
        <option value="Kauai">Kauai</option>
        <option value="Hawaii">Hawai‘i Island</option>
      </select>
    </div>
  );
}

export default IslandSelector;