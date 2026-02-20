import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

// need this so res.render works with ejs files in the views folder
app.set("view engine", "ejs");

// Make the styling show up.
// css is a static file so we have to tell express where to find it
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // Make the get route work and render the index.ejs file.
  res.render("index");
});

app.post("/submit", (req, res) => {
  // Make the generate name functionality work
  // when you click the button, it hits /submit
  // then we grab 1 random course id + 1 random course name

  const randomCourseID =
    courseIDs[Math.floor(Math.random() * courseIDs.length)];

  const randomCourseName =
    courseNames[Math.floor(Math.random() * courseNames.length)];

  // send them to index.ejs so it can show in the <h1>
  res.render("index", {
    courseID: randomCourseID,
    courseName: randomCourseName,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// instead of adjectives, these are course ids now
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

// instead of band names, these are course titles
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
  "Systems Analysis & Design",
];
