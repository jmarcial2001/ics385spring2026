/* 
BASIC STEPS THIS PROGRAM DOES:
1. Ask the user for a URL (using inquirer package)
2. Check if the URL looks valid (using the built-in URL class)
3. Turn the URL into a QR code image (using qr-image package)
4. Save the QR code as a PNG or SVG file (using fs package)
5. Save the URL text to a .txt file (using fs package)
*/

/*
Name: Jonas Marcial
Date: Feb 5, 2026

WHAT THIS PROGRAM DOES:
This is an improved QR Code Generator for Week 4 (Assignment 4b).
It's a step-by-step improvement of the basic Udemy starter code.

BASICS:
1. The program asks you "What URL do you want to turn into a QR code?"
2. You type a URL (like google.com)
3. If you forget https://, the program adds it automatically
4. You pick if you want PNG or SVG format
5. The program creates your QR code and saves it with a smart filename
6. It also saves your URL in a text file so you remember what it was
7. It logs everything to history.json so you can see past runs

KEY FEATURES:
- FRIENDLY PROMPTS: Uses inquirer to ask questions in the terminal (feels like a conversation)
- AUTO-FIX: Type "google.com" and it becomes "https://google.com" automatically
- SMART FILENAMES: Names are based on the domain (like google_2026-02-07T15-30-00.png)
- CLEAN FOLDER: All files go into output/ folder (keeps your project neat)
- NO OVERWRITES: If a file already exists, adds _2, _3, etc. instead of deleting the old one
- HISTORY LOG: Tracks every QR code created in history.json

HELPFUL NOTES:
- This program is designed for beginners to understand step-by-step
- Most helper functions do ONE simple job (makes code easier to read)
- Comments explain the "why" behind each piece of code

AI TOOLS USED:
GitHub Copilot helped create some helper functions and improve comments.
Look for "AI-GENERATED" labels to see which parts were AI-assisted.
*/

// IMPORTS (Loading Packages)
// These lines bring in the packages we installed with npm install

// inquirer: Allows us to ask the user questions in the terminal
// It displays prompts like "Enter a URL:" and waits for the user to type
import inquirer from "inquirer";

// qr-image: Converts text (like a URL) into a QR code image
// QR codes are those square barcodes you can scan with a phone
import qr from "qr-image";

// fs (file system): Node.js built-in package for working with files
// We use this to save the QR code image and text files to disk
import fs from "fs";

// path: Node.js built-in package for working with file paths
// This helps us build file paths that work on Windows, Mac, and Linux
import path from "path";

// SETTINGS (Configuration Variables)

// Name of the folder where we'll save all generated QR codes
// All output files go here to keep the project organized
const OUTPUT_DIR = "output";

// Name of the file where we'll save a log of all QR codes created
// This is useful to see history of what was generated
const HISTORY_FILE = "history.json";

// HELPER FUNCTION: Normalize URL
// WHY: Users might type "google.com" instead of "https://google.com"
// This function fixes that automatically
// INPUT: A URL string (maybe missing https://)
// OUTPUT: A full URL with https:// at the start

// EXAMPLE:
// Input: "google.com" → Output: "https://google.com"
// Input: "https://google.com" → Output: "https://google.com" (no change)
// Input: "" → Output: "" (empty stays empty)

function normalizeUrl(input) {
  // Trim removes spaces from the beginning and end
  // ?? means "if input is null or undefined, use empty string instead"
  const trimmed = (input ?? "").trim();
  
  // If the URL is empty, return empty string
  if (!trimmed) return "";
  
  // Check if the URL already starts with https:// or http://
  // /i means "case insensitive" (uppercase or lowercase both work)
  // If it does NOT start with http/https, add https://
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  
  // If it already has http/https, return it as-is
  return trimmed;
}

// HELPER FUNCTION: Check if URL is Valid
// WHY: We want to make sure the URL format is correct before creating a QR code
// This prevents errors and bad QR codes
// INPUT: A URL string
// OUTPUT: true if valid, false if invalid

// EXAMPLE:
// Input: "https://www.google.com" → Output: true
// Input: "invalid-url-no-domain" → Output: false
// Input: "" → Output: false

function isValidUrl(urlString) {
  // Try to use JavaScript's built-in URL class to parse the URL
  try {
    // The URL class automatically checks if the format is correct
    // If it is, it breaks the URL into parts like hostname, pathname, etc.
    const u = new URL(urlString);
    
    // Return true only if the URL has a valid hostname (like "google.com")
    // u.hostname is the domain name part of the URL
    return Boolean(u.hostname);
  } catch {
    // If the URL class throws an error (format is wrong),
    // we catch that error and return false
    return false;
  }
}


// HELPER FUNCTION: Make Filename Safe
// WHY: Windows doesn't like certain characters in filenames:
// < > : " / \ | ? *
// This function removes those bad characters and replaces them with underscores
// Also limits filename length to 80 characters (keeps it reasonable)
// INPUT: A filename string
// OUTPUT: A safe filename with bad characters removed

// EXAMPLE:
// Input: "my<file:name>.txt" → Output: "my_file_name_.txt"
// Input: "google.com" → Output: "google.com" (no change, all safe)

function makeSafeFilename(name) {
  // Regular expression that finds all bad characters
  // Replace all bad characters with underscore "_"
  // \x00-\x1F are invisible control characters (also not allowed)
  // Then take only the first 80 characters with .slice(0, 80)
  return name.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_").slice(0, 80);
}


// HELPER FUNCTION: Build Default Filename
// WHY: Instead of making users type boring filenames like "qr_code.png",
// we create smart filenames based on the URL and current time
// This makes it easy to remember which QR is for which URL
// INPUT: A full URL (like "https://www.google.com")
// OUTPUT: A filename (like "google_2026-02-07T15-30-45")

// EXAMPLE:
// Input: "https://www.google.com"
// Output: "google_2026-02-07T15-30-45"
// This includes: domain name + current date + time

function buildDefaultBaseName(urlString) {
  // Parse the URL to extract the domain name
  const u = new URL(urlString);
  
  // Get the hostname (like "www.google.com")
  // Remove "www." at the beginning to make it shorter
  // Then make it safe for use as a filename
  const domain = makeSafeFilename(u.hostname.replace(/^www\./, ""));
  
  // Get the current date and time in ISO format
  // ISO format looks like: 2026-02-07T15:30:45.123Z
  // We replace colons and periods with dashes to make it filename-safe
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  
  // Combine domain and timestamp
  // Example result: "google_2026-02-07T15-30-45-123Z"
  return `${domain}_${ts}`;
}

// HELPER FUNCTION: Ensure Output Folder Exists
// AI-GENERATED with Copilot
// WHY: The output/ folder should always exist before we save files to it
// What if the user accidentally deletes it? This function recreates it
// INPUT: None (uses the constant OUTPUT_DIR)
// OUTPUT: None (but creates the folder if it doesn't exist)

function ensureOutputDir() {
  // Check: does the output folder already exist?
  // fs.existsSync returns true if it exists, false if it doesn't
  if (!fs.existsSync(OUTPUT_DIR)) {
    // If it doesn't exist, create it now
    // mkdirSync means "make directory synchronously" (do it right now, don't wait)
    // { recursive: true } means create parent folders too if needed
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

// HELPER FUNCTION: Avoid Overwriting Files
// AI-GENERATED
// WHY: If a file with the same name already exists,
// we don't want to delete the old one. Instead, add _2, _3, etc.
// INPUT: A file path (like "output/google.png")
// OUTPUT: A safe file path that won't overwrite existing files

// EXAMPLE:
// Input: "output/google.png" (file already exists)
// Output: "output/google_2.png" (new name that doesn't exist yet)

function resolveNonOverwritePath(filePath) {
  // Check: does this file already exist?
  // If it doesn't exist, we're safe to use this path
  if (!fs.existsSync(filePath)) return filePath;

  // If the file EXISTS, we need to find a different name
  // Get the file extension (like ".png")
  const ext = path.extname(filePath);
  
  // Get the base filename without the extension
  // Example: "output/google.png" becomes "output/google"
  const base = filePath.slice(0, -ext.length);

  // Start with _2 and keep trying _3, _4, _5... until we find a name that doesn't exist
  let i = 2;
  while (fs.existsSync(`${base}_${i}${ext}`)) i++;
  
  // Return the new filename that doesn't exist
  // Example: "output/google_4.png"
  return `${base}_${i}${ext}`;
}

// HELPER FUNCTION: Save to History Log
// AI-GENERATED
// WHY: We want to keep a record of every QR code created
// This is saved in history.json as a list of all past runs
// INPUT: An entry object with details about the QR code (URL, format, filename, etc.)
// OUTPUT: None (but updates history.json file)

// EXAMPLE ENTRY:
// {
//   "createdAt": "2026-02-07T15:30:45.123Z",
//   "url": "https://www.google.com",
//   "format": "png",
//   "qrFile": "output/google_2026-02-07T15-30-45.png",
//   "urlFile": "output/google_2026-02-07T15-30-45.txt"
// }

function appendHistory(entry) {
  // Start with an empty list
  let list = [];
  
  // Check: does history.json file already exist?
  if (fs.existsSync(HISTORY_FILE)) {
    try {
      // Read the file content as a string
      const raw = fs.readFileSync(HISTORY_FILE, "utf8");
      
      // Parse the JSON (convert text to JavaScript objects)
      list = JSON.parse(raw);
      
      // Safety check: make sure it's actually an array
      // If it's not, start with an empty array
      if (!Array.isArray(list)) list = [];
    } catch {
      // If there's any error reading or parsing, just start fresh
      list = [];
    }
  }

  // Add the new entry to the list
  list.push(entry);
  
  // Write the updated list back to history.json
  // JSON.stringify converts objects to text
  // null and 2 parameters make it pretty-printed (easier to read)
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(list, null, 2), "utf8");
}

// MAIN FUNCTION
// "async" means this function can use await to wait for user input
// This is the main program that runs everything step by step

async function main() {
  // Step 1: Make sure the output folder exists
  // If user deleted it, this recreates it
  ensureOutputDir();

  // Step 2: Print welcome messages to the user
  console.log("\n=== QR Code Generator (Improved) ===");
  console.log("Tip: You can type google.com and I will fix it to https://google.com\n");

  // Step 3: Ask the user questions using inquirer
  // inquirer.prompt() displays questions and waits for the user to answer
  // It returns the answers in an object
  // "await" means "wait for the user to answer before continuing"
  const answers = await inquirer.prompt([
    // QUESTION 1: Ask for the URL
    {
      // "input" means the user can type anything (not just choosing from options)
      type: "input",
      
      // This is the name we'll use to access the answer later (answers.rawUrl)
      name: "rawUrl",
      
      // This is the text that appears in the terminal
      message: "Enter a URL to encode:",
      
      // validate function checks if the answer is correct before accepting it
      // If we return true, the answer is accepted
      // If we return a string, that string becomes the error message
      validate: (val) => {
        // First, try to normalize the URL (add https:// if missing)
        const normalized = normalizeUrl(val);
        
        // Check 1: Is it empty?
        if (!normalized) return "URL cannot be empty. Please type a URL.";
        
        // Check 2: Does it look like a valid URL?
        if (!isValidUrl(normalized)) return "That doesn't look like a valid URL. Try again.";
        
        // If both checks pass, accept the answer
        return true;
      },
    },
    // QUESTION 2: Ask user to pick a file format
    {
      // "list" means user picks from a list of options (not typing)
      type: "list",
      
      // This is the name we'll use to access the answer (answers.format)
      name: "format",
      
      // The question text shown to the user
      message: "Choose your QR file type:",
      
      // The list of options to choose from
      choices: ["png", "svg"],
      
      // The default option (what's selected if user just presses Enter)
      default: "png",
    },
    // QUESTION 3: Ask user for a custom filename (or use default)
    {
      // "input" means user can type a custom answer
      type: "input",
      
      // This is the name we'll use to access the answer (answers.baseName)
      name: "baseName",
      
      // The question text shown to the user
      message: "Filename (no extension). Press Enter for default:",
      
      // default function shown when user hasn't answered yet
      // "prev" is the answers from previous questions
      // This lets us use their URL to create a smart default filename
      default: (prev) => {
        // Get the URL they entered and normalize it
        const normalized = normalizeUrl(prev.rawUrl);
        // Build a smart filename based on their URL and current time
        return buildDefaultBaseName(normalized);
      },
      
      // filter function processes the input BEFORE accepting it
      // This cleans up the filename to make it safe
      filter: (val) => makeSafeFilename((val ?? "").trim()) || "qr_code",
    },
  ]);
  // END OF QUESTIONS

  // Step 4: Extract the user's answers into separate variables
  // Normalize the URL (add https:// if missing)
  const url = normalizeUrl(answers.rawUrl);
  
  // Get the format they chose (png or svg)
  const format = answers.format;
  
  // Get the filename they entered (or the default we generated)
  const baseName = answers.baseName;

  // Step 5: Create file paths in the output folder
  // Example: output/google_2026-02-07T15-30-45.png
  const qrPathRaw = path.join(OUTPUT_DIR, `${baseName}.${format}`);
  
  // Example: output/google_2026-02-07T15-30-45.txt
  const txtPathRaw = path.join(OUTPUT_DIR, `${baseName}.txt`);

  // Step 6: Check if files already exist
  // If they do, the function adds _2, _3, etc. to avoid overwriting
  const qrPath = resolveNonOverwritePath(qrPathRaw);
  const txtPath = resolveNonOverwritePath(txtPathRaw);

  // Step 7: Create a QR code image from the URL
  // qr.image() converts the URL text into QR code image data
  // { type: format } specifies if we want PNG or SVG
  const qrStream = qr.image(url, { type: format });

  // Step 8: Create a write stream (open a file for writing)
  // This prepares to write the QR image to disk
  const writeStream = fs.createWriteStream(qrPath);
  
  // Pipe (send) the QR image data into the file
  // The pipe() method connects two streams together
  // qrStream → writeStream means "QR image data goes into the file"
  qrStream.pipe(writeStream);

  // Step 9: Save the URL text to a text file
  // This saves the original URL so you remember what it was
  // "utf8" is the text encoding (standard for most text files)
  fs.writeFileSync(txtPath, url, "utf8");

  // Step 10: Add this run to the history log
  // Records when it was made, what URL, what format, and where files are saved
  appendHistory({
    createdAt: new Date().toISOString(),
    url,
    format,
    qrFile: qrPath,
    urlFile: txtPath,
  });

  // Step 11: Wait for the QR image to finish writing to disk
  // The "finish" event fires when the file has been completely written
  writeStream.on("finish", () => {
    // Get the domain name from the URL for display purposes
    const domain = new URL(url).hostname;

    // Show success messages to the user
    console.log("\n✅ Done!");
    console.log(`QR saved to:  ${qrPath}`);
    console.log(`URL saved to: ${txtPath}`);
    console.log(`History log:  ${HISTORY_FILE}`);
    console.log(`Domain check: ${domain}`); 

    // Show a security reminder
    console.log("\nSafety note: Always verify the domain before sharing a QR code.");
    console.log("QR codes can be replaced with fake ones that redirect to scam sites.\n");
  });

  // Step 12: Handle any errors that might occur while writing the file
  writeStream.on("error", (err) => {
    console.error("❌ Failed to write QR file:", err.message);
  });
}

// Step 13: Start the program
// Call the main() function to begin
// .catch() handles any unexpected errors that might happen
main().catch((err) => {
  // If something goes wrong, show the error message
  console.error("❌ Unexpected error:", err.message);
});
