/**
Jonas Marcial ICS 385 – Week 4
Week4_ics385/hero-hw4
5 npm packages and writes output
 */

const fs = require("fs");
const path = require("path");

// npm packages
const superheroes = require("superheroes");
const supervillains = require("supervillains");
const Quote = require("inspirational-quotes");
const movieQuotes = require("popular-movie-quotes");
const famousLastWords = require("famous-last-words");

// output folder
const outputDir = path.join(__dirname, "output");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// helper function to write files
function writeFile(name, content) {
  fs.writeFileSync(path.join(outputDir, name), content);
  console.log(`Created ${name}`);
}

// hero
const hero = superheroes.random();
writeFile("hero.txt", hero);

// villain
const villain = supervillains.random();
writeFile("villain.txt", villain);

// inspiration quote
const inspiration = Quote.getQuote();
writeFile(
  "inspiration-quote.txt",
  `"${inspiration.text}" — ${inspiration.author}`
);

// popular movie quote
const movieQuote = movieQuotes.getRandomQuote();
writeFile("popular-movie-quotes.txt", movieQuote);

// famous last words
const lastWords =
  famousLastWords[Math.floor(Math.random() * famousLastWords.length)];
writeFile("famous-last-words.txt", lastWords);

console.log("Completed the files.");







