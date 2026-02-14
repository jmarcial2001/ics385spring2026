// Jonas Marcial, Feb 12, 2026 
// ICS 385 (Week 5) f2c - calculator.js

const fs = require("fs");
const path = require("path");

// Reads f2cCalc.html and replaces {{F_TEMP}} and {{C_TEMP}}
function renderF2CPage(fTemp = "", cTemp = "") {
  const filePath = path.join(__dirname, "f2cCalc.html");
  let html = fs.readFileSync(filePath, "utf8");

  // Replace all occurrences of {{F_TEMP}}
  html = html.replaceAll("{{F_TEMP}}", fTemp === null || fTemp === undefined ? "" : String(fTemp));

  // Replace {{C_TEMP}} once
  html = html.replace("{{C_TEMP}}", cTemp === null || cTemp === undefined ? "" : String(cTemp));

  return html;
}

// Converts Fahrenheit to centigrade as integers
// Input and output must be integers
function convertF2CInt(fTempRaw) {
  const fInt = parseInt(fTempRaw, 10);


  // Check if conversion failed (user entered invalid input)
  if (Number.isNaN(fInt)) {
    // Return empty values so page doesn't break
    return { fInt: "", cInt: "" };
  }


  // Apply temperature conversion formula
  // (F - 32) * 5/9 = C
  const cFloat = (fInt - 32) * (5 / 9);

  // Convert result to integer, remove decimals
  // Ex: 37.7 → 37
  const cInt = parseInt(cFloat, 10);


  // Return both values as an object
  // This lets other files access both results easily
  return { fInt, cInt };
}

// Export functions for use in index.js
module.exports = {renderF2CPage, convertF2CInt,
};
