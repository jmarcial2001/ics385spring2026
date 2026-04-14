require('dotenv').config();
const mongoose = require('mongoose');
const Property = require('./models/Property');

const sampleProperties = [
  {
    name: 'Pacific Horizon Hotel',
    island: 'Oahu',
    type: 'hotel',
    location: 'Waikiki, Oahu',
    description: 'A modern hotel in Waikiki designed for business travelers, couples, and first-time visitors who want easy access to beaches, shopping, dining, and Honolulu attractions.',
    amenities: ['Free Wi-Fi', 'Pool', 'Fitness Center', 'Breakfast', 'Ocean View'],
    targetSegment: 'Business travelers, couples, and first-time visitors',
    imageURL: 'https://example.com/pacific-horizon-hotel.jpg'
  },
  {
    name: 'Waikiki Breeze Hotel',
    island: 'Oahu',
    type: 'hotel',
    location: 'Waikiki, Oahu',
    description: 'A comfortable hotel near Waikiki Beach offering convenient access to restaurants, entertainment, and local attractions.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Beach Access', 'Restaurant', 'Parking'],
    targetSegment: 'Couples and leisure travelers',
    imageURL: 'https://example.com/waikiki-breeze-hotel.jpg'
  },
  {
    name: 'Diamond Sands Inn',
    island: 'Oahu',
    type: 'hotel',
    location: 'Honolulu, Oahu',
    description: 'A centrally located hotel for visitors who want a practical and relaxing stay close to shopping and nightlife.',
    amenities: ['Pool', 'Gym', 'Free Wi-Fi', 'Room Service', 'City View'],
    targetSegment: 'First-time visitors and business travelers',
    imageURL: 'https://example.com/diamond-sands-inn.jpg'
  },
  {
    name: 'Aloha Harbor Suites',
    island: 'Oahu',
    type: 'hotel',
    location: 'Ala Moana, Oahu',
    description: 'A stylish hotel for guests who want a quiet stay with quick access to business districts and waterfront views.',
    amenities: ['Free Wi-Fi', 'Parking', 'Business Center', 'Fitness Center', 'Harbor View'],
    targetSegment: 'Business travelers and couples',
    imageURL: 'https://example.com/aloha-harbor-suites.jpg'
  },
  {
    name: 'Royal Palm Waikiki',
    island: 'Oahu',
    type: 'hotel',
    location: 'Waikiki, Oahu',
    description: 'A welcoming hotel built for travelers seeking a classic Waikiki experience with comfort and convenience.',
    amenities: ['Pool', 'Breakfast', 'Free Wi-Fi', 'Laundry', 'Balcony'],
    targetSegment: 'Families and first-time visitors',
    imageURL: 'https://example.com/royal-palm-waikiki.jpg'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Property.deleteMany({});
    console.log('Old property data removed');

    await Property.insertMany(sampleProperties);
    console.log('Sample property data inserted');

    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    await mongoose.connection.close();
  }
}

seedDatabase();