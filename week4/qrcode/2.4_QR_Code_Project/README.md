# QR Code Generator (Week4)

Overview
- Author: Jonas Marcial
- Date: Feb 5, 2026
- Purpose: Improve Udemy starter QR generator with validation, output folder, selectable formats, history logging, and safer filenames.

Design & New Features
- URL normalization: adds `https://` when missing.
- URL validation: basic check with the `URL` class before generating.
- Output folder: saves QR images and .txt files into `output/` to keep repo clean.
- Format choice: user selects `png` or `svg` at prompt.
- Non-overwrite: filenames automatically appended with `_2`, `_3`, etc. if duplicates exist.
- History log: appends run metadata to `history.json`.

Files Changed / Added
- `index.js` — improved main program (preamble comment included).
- `solution.js` — original solution with explanatory comments.
- `test_generate.js` — non-interactive test script (creates `output/test_qr.png`).

AI Involvement
- Comments and helper functions were assisted by AI (noted in files).
- AI tools used as: Codex / Copilot style assistants (recorded per assignment request).

How to run (quick)
1. Install dependencies if needed:
```bash
cd qrcode/2.4_QR_Code_Project
npm install
```
2. Interactive run (prompts):
```bash
node index.js
```
3. Non-interactive test (verifies `qr-image` works):
```bash
node test_generate.js
```



Test Results (Performed Feb 7, 2026)

**Test 1: Non-Interactive QR Generation**
```
Command: node test_generate.js
Result: PASSED
Output:
  - File created: output/test_qr.png (426 bytes)
  - Message: "Test QR generated: output\test_qr.png"
Purpose: Verifies qr-image package works without user input
```

**Test 2: Verify Output Folder Structure**
```
Command: dir output
Result: PASSED
Files in output/ folder:
  - google.com_2026-02-07T01-49-36-083Z.png (424 bytes) [from previous run]
  - google.com_2026-02-07T01-49-36-083Z.txt (18 bytes) [from previous run]
  - test_qr.png (426 bytes) [from this test session]
Purpose: Confirms outputs are organized in output/ folder with timestamp-based names
```

**Test 3: History Log**
```
File: history.json
Status: EXISTS
Content: Contains JSON array of previous QR generation runs
Purpose: Tracks all QR codes created with metadata (URL, format, filenames, timestamp)
```

**Test 4: Interactive Mode (Manual Testing)**
```
How to test yourself:
  1. Run: node index.js
  2. Enter URL when prompted (e.g., "google.com")
  3. Select format (PNG or SVG)
  4. Accept default filename or enter custom name
Expected behavior:
  - URL validation works (rejects invalid URLs)
  - Auto-fixes missing https://
  - Creates QR file in output/
  - Creates .txt file with URL
  - Appends to history.json
```

**Summary**
- Non-interactive test: PASSED (QR generation works)
- Output folder: PASSED (files organized correctly)
- History logging: PASSED (JSON log exists and contains data)
- All helper functions: Working (validated via code review)




Important Notes (Things to Know)
- The `inquirer` package works best when you run it in a real terminal (not in an automated system). If you try to pipe input, it may not work.
- Our URL check is simple and quick. It's not perfect for checking if a URL is truly safe—it just looks at basic format.

Cool Ideas We Researched (From Adobe Express, Bitly, and Venmo)
- **Colors & Logos**: Make QR codes look prettier with custom colors and logos in the middle (like Adobe Express does).
- **Shorter URLs**: Use a shortener like Bitly first so the QR code is simpler and easier to scan.
- **Payment QR codes**: Create special QR codes for payments (like Venmo) to make transactions faster.
- **Web preview**: Build a simple website where you can see your QR code before saving it.

What I Learned from This Project (Notes for Manager)
- The starter code from Udemy is really simple and easy to understand. My changes added useful features like picking file types and organizing files into a folder.
- Breaking code into small helper functions (like normalizing URLs) makes the code much cleaner and less likely to have bugs.
- Even small improvements like checking if a URL is valid before processing it make the app feel more professional.








Other notes: 

1. Original Code Summary:
Used inquirer to get a URL from the user in the terminal
Used qr-image to generate a QR image
Used fs to save:
qr_img.png
URL.txt

2. New Design Goals:
Validate URLs so users don’t generate broken QR codes
Auto-add https:// when missing
Let user choose output format (PNG or SVG)
Create an output/ folder to keep files organized
Prevent overwriting files
Save a history log (history.json)
Show a safety reminder to verify the domain before sharing

3. AI Usage:
I used AI tools to
suggest user-friendly features
help generate helper functions
