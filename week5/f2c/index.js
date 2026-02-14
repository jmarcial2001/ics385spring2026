// Jonas Marcial, Feb 12, 2026
// ICS 385 (Week 5) f2c - index.js

const express = require("express");
const bodyParser = require("body-parser");

const { renderF2CPage, convertF2CInt } = require("./calculator");

const app = express();

// Parse form data from post
app.use(bodyParser.urlencoded({ extended: true }));

// Root route fix
// When CodeSandbox opens the preview, it usually loads "/"
// Redirect to /f2c so the page loads instead of showing "Cannot GET /"
app.get("/", function (req, res) {
  res.redirect("/f2c");
});

// Get /f2c show the page (blank, or prefill if query parameters exist)
// Get should only accept the Fahrenheit input, not the Centigrade result
app.get("/f2c", function (req, res) {
  const fTemp = req.query.fTemp ?? "";

  // On Get, cTemp should be blank because we are not converting yet
  const html = renderF2CPage(fTemp, "");
  res.type("html").send(html);
});

// POST /f2c converts and rebuilds the page with the calculated result
app.post("/f2c", function (req, res) {
  console.log("POST received:", req.body.fTemp);

  const { fInt, cInt } = convertF2CInt(req.body.fTemp);

  console.log("Converted:", fInt, cInt);

  // Build the HTML page and insert values into the fields
  const html = renderF2CPage(fInt, cInt);
  res.type("html").send(html);
});

// Start the server
const PORT = process.env.PORT || 3001;

// Listen for requests on the port
app.listen(PORT, "0.0.0.0", function () {
  console.log("Server is running on port " + PORT);
});
