const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

const initializePassport = require("./passport-config");
const propertyRoutes = require("./routes/properties");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Session middleware must come before Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "temporary-secret-change-this",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
    },
  })
);

// Passport middleware
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Existing property routes
app.use("/", propertyRoutes);

// New admin authentication routes
app.use("/admin", authRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});