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

// Converts Fahrenheit -> centigrade as integers
function convertF2CInt(fTempRaw) {
  const fInt = parseInt(fTempRaw, 10);

  if (Number.isNaN(fInt)) {
    return { fInt: "", cInt: "" };
  }

  const cFloat = (fInt - 32) * (5 / 9);

  // Ensure integer output (truncate toward 0)
  const cInt = parseInt(cFloat, 10);

  return { fInt, cInt };
}

module.exports = {renderF2CPage, convertF2CInt,
};
