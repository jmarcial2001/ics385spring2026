import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//Step 3 - Make the styling show up.
//Hint 1: CSS files are static files!
//Hint 2: The header and footer are partials.
//Hint 3: Add the CSS link in header.ejs

//Step 4 - Add a dynamic year to the footer.
//Hint: Google to find out how to get the current year using JS.



app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //Step 1 - Make the get route work and render the index.ejs file.
});

app.post("/submit", (req, res) => {
  //Step 2 - Make the generate name functionality work
  //Hint: When the "Generate Name" button in index.ejs is clicked, it should hit up this route.
  //Then:
  //1. You should randomly pick an adjective from the const "adj" and a noun from const "noun",
  //scroll down to see the two arrays.
  //2. Send the index.ejs as a response and add the adjective and noun to the res.render
  //3. Test to make sure that the random words display in the h1 element in index.ejs

  
  const randomCourseID =
    courseIDs[Math.floor(Math.random() * courseIDs.length)];

  const randomCourseName =
    courseNames[Math.floor(Math.random() * courseNames.length)];

  res.render("index.ejs", {
    courseID: randomCourseID,
    courseName: randomCourseName,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Instead of adjectives, use Course IDs
const courseIDs = [
  "ICS 101",
  "ICS 110",
  "ICS 111",
  "ICS 141",
  "ICS 169",
  "ICS 171",
  "ICS 173",
  "ICS 184",
  "ICS 193v",
  "ICS 200",
  "ICS 211",
  "ICS 212",
  "ICS 225",
  "ICS 241",
  "ICS 251",
  "ICS 252",
  "ICS 272",
  "ICS 277",
  "ICS 278",
  "ICS 279",
  "ICS 281",
  "ICS 282",
  "ICS 283",
  "ICS 285",
  "ICS 293v",
  "ICS 320",
  "ICS 360",
  "ICS 385",
  "ICS 418",
];

// Instead of band names (nouns), use Course Names
const courseNames = [
  "Digital Tools for the Information World",
  "Introduction to Computer Programming",
  "Intro to Computer Science I",
  "Discrete Mathematics for Computer Science I",
  "Introduction to Information Security",
  "Introduction to Computer Security",
  "Introduction to Data Science",
  "Introduction to Networking",
  "Computer Science Internship I",
  "Web Technology",
  "Introduction to Computer Science II",
  "Program Structure",
  "Introduction to Blockchain Technology",
  "Discrete Mathematics for Computer Science II",
  "Introduction to Unix/Linux",
  "Unix/Linux System Administration",
  "Digital Imaging & Animation",
  "Introduction to Cyber Data Analytics",
  "Forensics Cyber Data Analytics",
  "Entrepreneurship and Applications of Cyber Data Analytics",
  "Ethical Hacking",
  "Computer Forensics",
  "Advanced Computer Graphics Design",
  "Digital Media Capstone",
  "Computer Science Internship II",
  "Introduction to Information Systems & E-Commerce",
  "Database Design & Development",
  "Web Development and Administration",
  "Systems Analysis & Designs",
];