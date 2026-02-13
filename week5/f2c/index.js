// Jonas Marcial, Feb 12, 2026 
// ICS 385 (Week 5) f2c - index.js


const express = require("express");
const bodyParser = require("body-parser");

const { renderF2CPage, convertF2CInt } = require("./calculator");

const app = express();



// Parse form data from post
app.use(bodyParser.urlencoded({ extended: true }));


// Get /f2c show the page (blank, or prefill if query parameters exist)
// runs when a user visits page
app.get("/f2c", function (req, res) {
  
  const fTemp = req.query.fTemp ?? "";
  const cTemp = req.query.cTemp ?? "";

  const html = renderF2CPage(fTemp, cTemp);
  res.type("html").send(html);
});


// Rebuild the page with the calculated result
app.post("/f2c", function (req, res) {
  const { fInt, cInt } = convertF2CInt(req.body.fTemp);


// Call function that builds the HTML page and inserts the values into the input fields
// Send updated HTML back to browser
  const html = renderF2CPage(fInt, cInt);
  res.type("html").send(html);
});


// Start the server
const PORT = process.env.PORT || 3000;


// Listen for requests on the port
app.listen(PORT, function () {  
  console.log("Server is running on port " + PORT);
}); 
