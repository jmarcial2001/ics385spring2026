const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  guestName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  island: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["hotel", "vacation rental"],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amenities: [String],
  targetSegment: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema],
});

module.exports = mongoose.model("Property", propertySchema);