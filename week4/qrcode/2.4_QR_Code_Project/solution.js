/*
Name: Jonas Marcial
Date: Feb 6, 2026

Overview:
This program creates a QR code from a URL entered by the user.
The program asks the user to type a website address in the terminal.
After the user enters the URL, the program creates a QR code image
and saves it as a PNG file. It also saves the typed URL into a text file.

Key Highlights:
- Uses inquirer to ask the user for input in the terminal
- Uses qr-image to convert a URL into a QR code image
- Uses the built-in fs module to save files locally
- Demonstrates how Node.js packages work together

AI Usage:
Some comments and explanations were generated with AI assistance
(ChatGPT / Codex-style tools) to improve readability and understanding.
*/


// import inquirer so we can ask questions in the terminal
import inquirer from "inquirer";

// import qr-image so we can create a QR code from text
import qr from "qr-image";

// import the file system module so we can create and save files
import fs from "fs";


// inquirer.prompt asks the user a question in the terminal
// the program waits until the user types an answer
inquirer
  .prompt([
    {
      // this message appears in the terminal
      message: "Type in your URL: ",

      // this is the name used to store the user's answer
      name: "URL",
    },
  ])

  // when the user finishes typing, the answer is returned here
  .then((answers) => {

    // save the user's input into a variable called url
    // answers.URL comes from the name we defined above
    const url = answers.URL;

    // create a QR code image using the qr-image package
    // the QR code stores the URL text inside it
    var qr_svg = qr.image(url);

    // pipe means sending the generated QR image data
    // into a file that we create called qr_img.png
    // this saves the QR code image to the project folder
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));

    // create a text file called URL.txt
    // this saves the original URL that the user typed
    // so we have a record of what was used to create the QR code
    fs.writeFile("URL.txt", url, (err) => {

      // if an error happens while saving, stop the program
      if (err) throw err;

      // message shown when everything finishes successfully
      console.log("The file has been saved!");
    });
  })

  // this section handles errors if something goes wrong
  .catch((error) => {

    // this error happens if the terminal cannot display prompts
    if (error.isTtyError) {

      // prompt could not run in this environment
    } else {

      // other unexpected errors would be handled here
    }
  });


/*
Summary:

1. The program asks the user to enter a URL.
2. The entered URL is turned into a QR code image.
3. The QR code image is saved as qr_img.png.
4. The URL is also saved in a text file called URL.txt.

This shows how different Node.js packages work together
to take user input, process data, and create files.
*/
