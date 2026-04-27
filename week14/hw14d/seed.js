const mongoose = require("mongoose");
require("dotenv").config();

const Property = require("./models/Property");

const seedProperties = [
  {
    name: "Wailea Sunset Retreat",
    island: "Maui",
    type: "hotel",
    description: "Oceanfront boutique hotel with beautiful sunset views.",
    amenities: ["Pool", "Spa", "Free Wi-Fi", "Breakfast"],
    targetSegment: "Honeymooners",
    imageURL: "https://example.com/wailea.jpg",
    reviews: [
      {
        guestName: "Jonas",
        rating: 5,
        comment: "Amazing stay and very relaxing."
      },
      {
        guestName: "Malia",
        rating: 4,
        comment: "Beautiful property and friendly staff."
      }
    ]
  },
  {
    name: "Kihei Beach Escape",
    island: "Maui",
    type: "vacation rental",
    description: "Cozy rental close to the beach and local restaurants.",
    amenities: ["Kitchen", "Parking", "Air Conditioning"],
    targetSegment: "Families",
    imageURL: "https://example.com/kihei.jpg",
    reviews: [
      {
        guestName: "Leilani",
        rating: 4,
        comment: "Great location and clean rooms."
      }
    ]
  },
  {
    name: "Princeville Garden Villa",
    island: "Kauai",
    type: "vacation rental",
    description: "Quiet villa surrounded by lush tropical gardens.",
    amenities: ["Garden View", "Wi-Fi", "Washer"],
    targetSegment: "Eco-tourists",
    imageURL: "https://example.com/princeville.jpg",
    reviews: [
      {
        guestName: "Kai",
        rating: 5,
        comment: "Peaceful and perfect for a quiet getaway."
      }
    ]
  },
  {
    name: "Waikiki Urban Stay",
    island: "Oahu",
    type: "hotel",
    description: "Modern boutique hotel in the heart of Waikiki.",
    amenities: ["Gym", "Pool", "City View"],
    targetSegment: "International visitors",
    imageURL: "https://example.com/waikiki.jpg",
    reviews: [
      {
        guestName: "Noah",
        rating: 3,
        comment: "Good location but a little noisy."
      }
    ]
  },
  {
    name: "Volcano Eco Lodge",
    island: "Big Island",
    type: "hotel",
    description: "Nature-focused lodge near Volcano National Park.",
    amenities: ["Breakfast", "Hiking Trails", "Parking"],
    targetSegment: "Adventure seekers",
    imageURL: "https://example.com/volcano.jpg",
    reviews: [
      {
        guestName: "Ava",
        rating: 5,
        comment: "Unique experience and amazing scenery."
      }
    ]
  }
];

async function seedDB() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");

    await Property.deleteMany({});
    console.log("Old properties removed");

    await Property.insertMany(seedProperties);
    console.log("Seed data inserted");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDB();