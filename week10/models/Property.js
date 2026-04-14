const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  island: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['hotel', 'vacation rental']
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  amenities: [{
    type: String,
    trim: true
  }],
  targetSegment: {
    type: String,
    required: true,
    trim: true
  },
  imageURL: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

propertySchema.index({ island: 1, type: 1 });

module.exports = mongoose.model('Property', propertySchema);