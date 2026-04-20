import { useEffect, useState } from "react";

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_KEY;
    const city = "Honolulu";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    async function fetchWeather() {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Weather request failed");
        }

        setWeather(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchWeather();
  }, []);

  return (
    <div className="chart-box">
      <h3>Current Waikiki Weather</h3>

      {error && <p style={{ textAlign: "center" }}>Error: {error}</p>}

      {!weather && !error && (
        <p style={{ textAlign: "center" }}>Loading weather...</p>
      )}

      {weather && (
        <div style={{ textAlign: "center" }}>
          <p><strong>Location:</strong> {weather.name}</p>
          <p><strong>Temperature:</strong> {Math.round(weather.main.temp)}°F</p>
          <p><strong>Condition:</strong> {weather.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Wind:</strong> {Math.round(weather.wind.speed)} mph</p>
        </div>
      )}
    </div>
  );
}

export default WeatherWidget;