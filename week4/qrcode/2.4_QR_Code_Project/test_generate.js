/*
Name: Jonas Marcial
Date: Feb 5, 2026

Overview:
This is a simple test script that checks if the qr-image package works correctly.
It does NOT ask you any questions (it's not interactive).
It just automatically creates one QR code and saves it as a PNG file.
This is useful for testing without needing user input.

What This Test Does:
1. Uses a sample URL (example.com)
2. Generates a QR code image from that URL
3. Saves the QR code to the output/ folder
4. Tells you if it worked or if there was an error

AI Usage:
Created with AI assistance as a simple verification step.
*/

// Import the qr-image package so we can create QR codes
import qr from "qr-image";

// Import the fs (file system) package so we can save files to disk
import fs from "fs";

// Import the path package to help us build file paths in a way that works on any computer
import path from "path";

// Set the name of the folder where we want to save the QR code
const OUTPUT_DIR = "output";

// Check: Does the output folder already exist?
// If it does NOT exist, create it now (mkdirSync creates a new folder)
// The { recursive: true } part means it will create parent folders too if needed
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Create a test URL that we'll turn into a QR code
const testUrl = "https://www.example.com";

// Build the full file path where we want to save the QR code
// For example: output/test_qr.png
const outPath = path.join(OUTPUT_DIR, "test_qr.png");

// Step 1: Tell qr-image to create a QR code image from our test URL
// { type: "png" } means we want it as a PNG image (not SVG)
const stream = qr.image(testUrl, { type: "png" });

// Step 2: Create a file write stream
// This is like opening a file and getting ready to write data into it
const ws = fs.createWriteStream(outPath);

// Step 3: Connect the QR image to the file
// The .pipe() method sends the QR image data into the file we just opened
// This actually writes the QR code to disk
stream.pipe(ws);

// Step 4: Wait for the file to finish saving
// When the .on("finish") event happens, the file has been completely written
ws.on("finish", () => {
  // Print a success message showing where the file was saved
  console.log("Test QR generated:", outPath);
});

// Step 5: Handle any errors that might happen
// If something goes wrong while saving, this code will run
ws.on("error", (err) => {
  // Print an error message so you know what went wrong
  console.error("Failed to generate test QR:", err.message);
});
