// Jonas Marcial, Feb 2026
// ICS 385 Week 5 - Volume Cylinder Calculator
// main express

const express = require("express");
const bodyParser = require("body-parser");

const {
  renderVolPage,
  calculateCylinderVolume
} = require("./calculator");

const app = express();

// allows Express to read form data from POST
app.use(bodyParser.urlencoded({ extended: true }));

// Root route
// When the page opens, redirect to /VolCalc
app.get("/", function (req, res) {
  res.redirect("/VolCalc");
});

// Get method
// Shows the web form
app.get("/VolCalc", function (req, res) {
  const html = renderVolPage("", "", "");
  res.type("html").send(html);
});

// Post method
// Runs when user clicks Calculate
app.post("/VolCalc", function (req, res) {
  console.log("POST received:", req.body);

  const result = calculateCylinderVolume(
    req.body.radius,
    req.body.height
  );

  const html = renderVolPage(
    result.radius,
    result.height,
    result.volume
  );

  res.type("html").send(html);
});

// Start server
const PORT = process.env.PORT || 3003;

app.listen(PORT, "0.0.0.0", function () {
  console.log("Server running on port " + PORT);
});
