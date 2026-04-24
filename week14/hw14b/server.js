require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const passport = require("passport");

const User = require("./models/User");
const initializePassport = require("./passport-config");
const isAuthenticated = require("./middleware/isAuthenticated");

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

initializePassport(passport);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/register", (req, res) => {
  res.send(`
    <h1>Register</h1>
    <form method="POST" action="/register">
      <label>Email:</label>
      <input type="email" name="email" required />
      <br><br>
      <label>Password:</label>
      <input type="password" name="password" required />
      <br><br>
      <button type="submit">Register</button>
    </form>
    <p><a href="/login">Already have an account? Login</a></p>
  `);
});

app.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.send(`
        <h1>Email already exists</h1>
        <p>Please use a different email or go to login.</p>
        <a href="/register">Back to Register</a>
        <br><br>
        <a href="/login">Go to Login</a>
      `);
    }

    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();
    res.redirect("/login?registered=success");
  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.send("Error registering user. Check terminal for details.");
  }
});

app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/profile?login=success");
  }

  const registeredMessage =
    req.query.registered === "success"
      ? "<p style='color: green;'>You have registered successfully. Please log in.</p>"
      : "";

  const errorMessage =
    req.query.error === "true"
      ? "<p style='color: red;'>Wrong email or password. Please try again.</p>"
      : "";

  res.send(`
    <h1>Login</h1>
    ${registeredMessage}
    ${errorMessage}
    <form method="POST" action="/login">
      <label>Email:</label>
      <input type="email" name="email" required />
      <br><br>
      <label>Password:</label>
      <input type="password" name="password" required />
      <br><br>
      <button type="submit">Login</button>
    </form>
    <p><a href="/register">Need an account? Register</a></p>
  `);
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile?login=success",
    failureRedirect: "/login?error=true",
  })
);

app.get("/profile", isAuthenticated, (req, res) => {
  const loginMessage =
    req.query.login === "success"
      ? "<p style='color: green;'>Login successful.</p>"
      : "";

  res.send(`
    <h1>Profile</h1>
    ${loginMessage}
    <p>Email: ${req.user.email}</p>
    <p>Role: ${req.user.role}</p>
    <a href="/logout">Logout</a>
  `);
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});




// hw14test101@test.com   Password123    

// nashmarcial73@gmail.com   JonasMarcial
