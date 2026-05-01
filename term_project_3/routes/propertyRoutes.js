const express = require("express");
const router = express.Router();
const Property = require("../models/Property");

// GET all properties
router.get("/", async (req, res) => {
  try {
    const { island, minRating } = req.query;

    const filter = {};

    if (island) {
      filter.island = island;
    }

    let properties = await Property.find(filter);

    if (minRating) {
      properties = properties.filter((property) => {
        if (!property.reviews.length) return false;

        const averageRating =
          property.reviews.reduce((sum, review) => sum + review.rating, 0) /
          property.reviews.length;

        return averageRating >= Number(minRating);
      });
    }

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error getting properties", error });
  }
});

// GET one property
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: "Error getting property", error });
  }
});

// POST review
router.post("/:id/reviews", async (req, res) => {
  try {
    const { guestName, rating, comment } = req.body;

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    property.reviews.push({
      guestName,
      rating,
      comment,
    });

    await property.save();

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
});

module.exports = router;