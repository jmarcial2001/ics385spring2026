/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

/*
Name: Jonas Marcial
Date: Feb 6, 2026

Overview:
This is an improved QR Code Generator for Week 4 (Assignment 4b).
It asks the user for a URL, checks if it looks valid, fixes missing https://,
then generates a QR code file (PNG or SVG). It also saves the URL in a .txt file,
stores outputs inside an output/ folder, and logs each run in history.json.

Key Highlights:
- Beginner-friendly terminal prompts using inquirer
- URL validation + auto-fix for missing https://
- Choose output type: PNG or SVG
- Saves files into output/ folder (clean project)
- Avoids overwriting files by adding _2, _3, etc.
- Saves a history log in history.json (simple tracking)

AI Usage:
Some helper functions and comments were created with AI help.
AI-GENERATED sections are labeled below.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import path from "path";

// Folder to store generated files
const OUTPUT_DIR = "output";
// File to store a simple history log
const HISTORY_FILE = "history.json";

// If user types "google.com", we turn it into "https://google.com"
function normalizeUrl(input) {
  const trimmed = (input ?? "").trim();
  if (!trimmed) return "";
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

// Quick URL validity check using the built-in URL class
function isValidUrl(urlString) {
  try {
    const u = new URL(urlString);
    return Boolean(u.hostname);
  } catch {
    return false;
  }
}

// Makes a filename safe by removing characters Windows doesn't like
function makeSafeFilename(name) {
  return name.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_").slice(0, 80);
}

// Create a default base filename like "google_2026-02-06T15-22-00"
function buildDefaultBaseName(urlString) {
  const u = new URL(urlString);
  const domain = makeSafeFilename(u.hostname.replace(/^www\./, ""));
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  return `${domain}_${ts}`;
}

// AI-GENERATED: Ensure output folder exists (in case user deleted it)
function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

// AI-GENERATED: If file exists, add _2, _3, etc. so we don't overwrite
function resolveNonOverwritePath(filePath) {
  if (!fs.existsSync(filePath)) return filePath;

  const ext = path.extname(filePath);
  const base = filePath.slice(0, -ext.length);

  let i = 2;
  while (fs.existsSync(`${base}_${i}${ext}`)) i++;
  return `${base}_${i}${ext}`;
}

// AI-GENERATED: Add a record into history.json
function appendHistory(entry) {
  let list = [];
  if (fs.existsSync(HISTORY_FILE)) {
    try {
      const raw = fs.readFileSync(HISTORY_FILE, "utf8");
      list = JSON.parse(raw);
      if (!Array.isArray(list)) list = [];
    } catch {
      list = [];
    }
  }

  list.push(entry);
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(list, null, 2), "utf8");
}

async function main() {
  ensureOutputDir();

  console.log("\n=== QR Code Generator (Improved) ===");
  console.log("Tip: You can type google.com and I will fix it to https://google.com\n");

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "rawUrl",
      message: "Enter a URL to encode:",
      validate: (val) => {
        const normalized = normalizeUrl(val);
        if (!normalized) return "URL cannot be empty. Please type a URL.";
        if (!isValidUrl(normalized)) return "That doesn't look like a valid URL. Try again.";
        return true;
      },
    },
    {
      type: "list",
      name: "format",
      message: "Choose your QR file type:",
      choices: ["png", "svg"],
      default: "png",
    },
    {
      type: "input",
      name: "baseName",
      message: "Filename (no extension). Press Enter for default:",
      default: (prev) => {
        const normalized = normalizeUrl(prev.rawUrl);
        return buildDefaultBaseName(normalized);
      },
      filter: (val) => makeSafeFilename((val ?? "").trim()) || "qr_code",
    },
  ]);

  const url = normalizeUrl(answers.rawUrl);
  const format = answers.format;
  const baseName = answers.baseName;

  // Create file paths inside output/
  const qrPathRaw = path.join(OUTPUT_DIR, `${baseName}.${format}`);
  const txtPathRaw = path.join(OUTPUT_DIR, `${baseName}.txt`);

  // Avoid overwriting existing files
  const qrPath = resolveNonOverwritePath(qrPathRaw);
  const txtPath = resolveNonOverwritePath(txtPathRaw);

  // Create QR image stream
  const qrStream = qr.image(url, { type: format });

  // Save QR file
  const writeStream = fs.createWriteStream(qrPath);
  qrStream.pipe(writeStream);

  // Save URL text file
  fs.writeFileSync(txtPath, url, "utf8");

  // Save history log
  appendHistory({
    createdAt: new Date().toISOString(),
    url,
    format,
    qrFile: qrPath,
    urlFile: txtPath,
  });

  writeStream.on("finish", () => {
    const domain = new URL(url).hostname;

    console.log("\n✅ Done!");
    console.log(`QR saved to:  ${qrPath}`);
    console.log(`URL saved to: ${txtPath}`);
    console.log(`History log:  ${HISTORY_FILE}`);
    console.log(`Domain check: ${domain}`); 

        console.log("\nSafety note: Always verify the domain before sharing a QR code.");
    console.log("QR codes can be replaced with fake ones that redirect to scam sites.\n");
  });

  writeStream.on("error", (err) => {
    console.error("❌ Failed to write QR file:", err.message);
  });
}

main().catch((err) => {
  console.error("❌ Unexpected error:", err.message);
});
