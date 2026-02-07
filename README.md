# ICS 385 Spring 2026

This is the main page for Course ICS 385 Spring 2026.

## Week 1 - Introduction, AI and Setup

## Week 2 - HTML and CSS
- HW2: Bio Page - [index.html](week2/hw2/index.html), [stylesheet.css](week2/hw2/stylesheet.css)

## Week 3 - JavaScript
- HW 1: Dicee Game - [dicee.html](week3/hw1/dicee.html), [styles.css](week3/hw1/styles.css), [index.js](week3/hw1/index.js)
- HW 2: Simon Game - [index.html](week3/hw2/index.html), [styles.css](week3/hw2/styles.css), [game.js](week3/hw2/game.js)

## Week 4 - NodeJS
- HW 1: hero-hw4 - [app.js](week4/app.js)
Extends the in-class hero Node.js example by using five npm packages to generate content and save the results to text files.
1. superheroes - [hero.txt](week4/output/hero.txt)
2. supervillains - [villain.txt](week4/output/villain.txt)
3. inspirational-quotes - [inspiration-quote.txt](week4/output/inspiration-quote.txt)
4. popular-movie-quotes - [popular-movie-quotes.txt](week4/output/popular-movie-quotes.txt)
5. famous-last-words - [famous-last-words.txt](week4/output/famous-last-words.txt)

- HW 2: QR Code
  Functions:
    normalizeUrl(input)
    isValidUrl(url)
    makeSafeFilename(name)
    buildDefaultBaseName(url)
    ensureOutputDir()
    resolveNonOverwritePath(path)
    appendHistory(entry)
    
“I improved the QR generator by validating URLs, fixing missing https, letting users pick PNG or SVG, saving output in an organized folder, preventing   overwrites, logging history, and showing a safety reminder.”

1. Overview
This project started from the Udemy QR Code Generator (Section 23.199).  
The original code asks the user for a URL, generates a QR image, and saves the URL into a text file.

My manager asked me to make this code easier to use and safer.

2. Original Code Summary (What it did)
- Used inquirer to get a URL from the user in the terminal
- Used qr-image to generate a QR image
- Used fs to save:
  - qr_img.png
  - URL.txt

3. New Design Goals (What I planned to add)
- Validate URLs so users don’t generate broken QR codes
- Auto-add https:// when missing
- Let user choose output format (PNG or SVG)
- Create an output/ folder to keep files organized
- Prevent overwriting files
- Save a history log (history.json)
- Show a safety reminder to verify the domain before sharing

4. AI Usage
I used AI tools (ChatGPT / Codex-style help) to:
- explain the code in beginner-friendly comments
- suggest user-friendly features
- help generate helper functions

5. Tests
(We will fill this after we finish coding and run test inputs.)

6. What I learned (Note to Manager)

