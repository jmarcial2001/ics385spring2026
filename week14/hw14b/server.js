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
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();
    res.redirect("/login");
  } catch (err) {
    res.send("Error registering user. Email may already exist.");
  }
});

app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }

  res.send(`
    <h1>Login</h1>
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
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);

app.get("/profile", isAuthenticated, (req, res) => {
  res.send(`
    <h1>Profile</h1>
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