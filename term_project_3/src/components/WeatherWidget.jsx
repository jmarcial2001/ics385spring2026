import { useEffect, useState } from "react";

function WeatherWidget({ city }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWeather() {
      try {
        setWeather(null);
        setError("");

        const apiKey = import.meta.env.VITE_WEATHER_KEY;

        if (!apiKey || apiKey === "your_weather_key_here") {
          setError("Weather API key is missing.");
          return;
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},US&units=imperial&appid=${apiKey}`
        );

        const data = await response.json();

        if (!response.ok || !data.main) {
          setError("Weather data is unavailable.");
          return;
        }

        setWeather(data);
      } catch (error) {
        console.error("Weather error:", error);
        setError("Could not load weather.");
      }
    }

    fetchWeather();
  }, [city]);

  if (error) {
    return (
      <div className="weather-card">
        <h3>{city} Weather</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!weather) {
    return <div className="weather-card">Loading weather...</div>;
  }

  return (
    <div className="weather-card">
      <h3>{city} Weather</h3>
      <p>{Math.round(weather.main.temp)}°F</p>
      <p>{weather.weather[0].description}</p>
    </div>
  );
}

export default WeatherWidget;