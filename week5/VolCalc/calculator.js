// Jonas Marcial, Feb 2026
// ICS 385 Week 5 - Volume Cylinder Calculator
// contains the math and HTML rendering functions

const fs = require("fs");
const path = require("path");

function renderVolPage(radius = "", height = "", volume = "") {
  const filePath = path.join(__dirname, "VolCalculator.html");

  let html = fs.readFileSync(filePath, "utf8");

  // Replace placeholders in HTML
  html = html.replaceAll("{{RADIUS}}", radius ?? "");
  html = html.replaceAll("{{HEIGHT}}", height ?? "");
  html = html.replaceAll("{{VOLUME}}", volume ?? "");

  return html;
}

// Calculates the volume of a cylinder
// Formula: volume = pi * r^2 * h
function calculateCylinderVolume(radiusRaw, heightRaw) {
  // Convert input into numbers
  const radius = parseFloat(radiusRaw);
  const height = parseFloat(heightRaw);

  // If input is invalid, return empty values
  if (Number.isNaN(radius) || Number.isNaN(height)) {
    return { radius: "", height: "", volume: "" };
  }

  // Math.PI gives value of pi
  // Math.pow(radius, 2) means radius squared
  const volume =
    Math.PI * Math.pow(radius, 2) * height;

  // Format result to 2 decimal places
  const volumeFormatted = volume.toFixed(2);

  return {
    radius,
    height,
    volume: volumeFormatted
  };
}

// Export functions so index.js can use them
module.exports = {
  renderVolPage,
  calculateCylinderVolume
};
