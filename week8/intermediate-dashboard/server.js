// Import required packages and local configuration
const express = require("express");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const SecureConfig = require("./config");

// Create the Express application
const app = express();

// Use the PORT value from the .env file if available.
// If not, default to port 3000 for local development.
const PORT = process.env.PORT || 3000;

// Read and parse the local course catalog JSON file
function getCourses() {
  const filePath = path.join(__dirname, "data", "courses.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData);
}

// Validate required environment variables before running API features.
// This helps catch missing API keys early.
const configIsValid = SecureConfig.validateEnv();

if (!configIsValid) {
  console.log("Warning: Some environment variables are missing.");
  console.log("API-based features may not work until the .env file is completed.");
}

// Serve static frontend files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Basic test route to confirm the server is working
app.get("/api/status", (req, res) => {
  res.json({
    message: "Server is running successfully."
  });
});

// API route to return the course catalog
app.get("/api/courses", (req, res) => {
  try {
    const courses = getCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({
      error: "Failed to load course data."
    });
  }
});


// API route to return weather data for Kahului
app.get("/api/weather", async (req, res) => {
  try {
    const apiKey = SecureConfig.get("OPENWEATHER_API_KEY");

    if (!apiKey) {
      return res.status(500).json({
        error: "Weather API key is missing."
      });
    }

    const city = "Kahului";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    const response = await axios.get(weatherUrl);

    res.json({
      city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed
    });
  } catch (error) {
  console.log("Weather API error:", error.response?.data || error.message);

  res.status(500).json({
    error: "Failed to fetch weather data."
  });
}
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});