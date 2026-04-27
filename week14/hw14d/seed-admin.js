require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

async function seedAdmin() {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");

    const existingAdmin = await User.findOne({
      email: "admin@hawaiihospitality.com",
    });

    if (existingAdmin) {
      console.log("Admin user already exists.");
      process.exit(0);
    }

    const admin = new User({
      email: "admin@hawaiihospitality.com",
      password: "AdminPass123!",
      role: "admin",
    });

    await admin.save();

    console.log("Admin user created successfully.");
    console.log("Email: admin@hawaiihospitality.com");
    console.log("Password: AdminPass123!");
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

seedAdmin();