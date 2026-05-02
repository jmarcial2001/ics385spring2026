require("dotenv").config();

const mongoose = require("mongoose");
const Property = require("./models/Property");
const User = require("./models/User");
const Offer = require("./models/Offer");

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    await Property.deleteMany({});
    await User.deleteMany({});
    await Offer.deleteMany({});

    await Property.create([
      {
        name: "Malama Waikiki Resort",
        island: "Oahu",
        type: "hotel",
        location: "Waikiki, Honolulu",
        description:
          "Malama Waikiki Resort is a 4-star resort hotel in Waikiki with an old-style Hawaiian atmosphere. The property is designed for couples, leisure travelers, and first-time visitors who want a relaxing stay close to the beach, shopping, dining, and Oahu attractions.",
        amenities: [
          "Pool Access",
          "Free Wi-Fi",
          "On-site Dining",
          "Beach Access",
          "Parking",
          "Laundry",
        ],
        targetSegment: "couples, leisure travelers, and first-time visitors",
        imageURL:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        reviews: [
          {
            guestName: "Malia",
            rating: 5,
            comment: "Beautiful resort with a relaxing local feel.",
          },
          {
            guestName: "David",
            rating: 4,
            comment: "Great location near Waikiki Beach and restaurants.",
          },
        ],
      },
      {
        name: "Maui Sunset Villas",
        island: "Maui",
        type: "vacation rental",
        location: "Kihei, Maui",
        description:
          "A relaxing Maui vacation rental for families and couples looking for beach access and sunset views.",
        amenities: ["Kitchen", "Free Wi-Fi", "Ocean View", "Parking"],
        targetSegment: "families and couples",
        imageURL:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      },
      {
        name: "Kauai Garden Inn",
        island: "Kauai",
        type: "hotel",
        location: "Lihue, Kauai",
        description:
          "A garden-style Kauai hotel for travelers who want a quiet and natural island experience.",
        amenities: ["Garden Area", "Breakfast", "Free Wi-Fi", "Parking"],
        targetSegment: "nature travelers",
        imageURL:
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
      },
      {
        name: "Hilo Bay Lodge",
        island: "Hawaii",
        type: "hotel",
        location: "Hilo, Hawai‘i Island",
        description:
          "A comfortable lodge near Hilo Bay for travelers interested in volcanoes, waterfalls, and local culture.",
        amenities: ["Breakfast", "Free Wi-Fi", "Laundry", "Parking"],
        targetSegment: "adventure travelers",
        imageURL:
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      },
      {
        name: "North Shore Surf Stay",
        island: "Oahu",
        type: "vacation rental",
        location: "Haleiwa, Oahu",
        description:
          "A casual North Shore vacation rental for surfers and adventure travelers.",
        amenities: ["Surfboard Storage", "Kitchen", "Free Wi-Fi", "Parking"],
        targetSegment: "surfers and adventure travelers",
        imageURL:
          "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      },
    ]);

    await User.create({
      email: "admin@malamawaikiki.com",
      password: "password123",
      role: "admin",
    });

    await Offer.create({
      title: "Spring Waikiki Special",
      message:
        "Book a relaxing Waikiki stay and enjoy a special welcome amenity at check-in.",
      active: true,
    });

    console.log("Seed data inserted");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();