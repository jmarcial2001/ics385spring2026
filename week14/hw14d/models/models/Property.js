const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  guestName: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  island: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  amenities: {
    type: [String],
    default: []
  },
  targetSegment: {
    type: String
  },
  imageURL: {
    type: String
  },
  reviews: [reviewSchema]
});

module.exports = mongoose.model("Property", propertySchema);