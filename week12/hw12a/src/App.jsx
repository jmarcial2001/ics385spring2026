import './App.css'
import IslandCard from './IslandCard'

function App() {
  const islands = [
    {
      id: 1,
      name: 'Maui',
      description: 'Known as the Valley Isle, famous for Road to Hana and Haleakala.',
      tip: 'Visit Haleakala crater at sunrise and arrive early.',
    },
    {
      id: 2,
      name: 'Oahu',
      description: 'Home to Honolulu, Waikiki Beach, and Pearl Harbor.',
      tip: 'Take TheBus for an affordable way to explore the island.',
    },
    {
      id: 3,
      name: 'Kauai',
      description: 'The Garden Isle, known for the Na Pali Coast and Waimea Canyon.',
      tip: 'Bring hiking shoes if you plan to explore the trails.',
    },
  ]

  return (
    <div className="app">
      <h1>Hawaii Island Cards</h1>

      {islands.map((island) => (
        <IslandCard
          key={island.id}
          name={island.name}
          description={island.description}
          tip={island.tip}
        />
      ))}
    </div>
  )
}

export default App