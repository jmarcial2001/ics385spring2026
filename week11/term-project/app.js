const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const propertyRoutes = require("./routes/properties");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use("/", propertyRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});