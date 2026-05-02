require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const passport = require("passport");
const cors = require("cors");
const helmet = require("helmet");

const initializePassport = require("./passport-config");

const propertyRoutes = require("./routes/propertyRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const offerRoutes = require("./routes/offerRoutes");
const isAuthenticated = require("./middleware/isAuthenticated");

const app = express();
const PORT = process.env.PORT || 3000;

initializePassport(passport);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "temporarysecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 3,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/properties", propertyRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/offers", offerRoutes);
app.use("/admin", authRoutes);

app.get("/admin/dashboard", isAuthenticated, (req, res) => {
  res.json({
    message: "Protected admin dashboard",
    user: {
      email: req.user.email,
      role: req.user.role,
    },
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Malama Waikiki Resort API is running",
  });
});

if (require.main === module) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB connected");
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
}

module.exports = app;