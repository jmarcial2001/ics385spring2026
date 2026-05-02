const express = require("express");
const { body, query, validationResult } = require("express-validator");
const router = express.Router();
const Property = require("../models/Property");

// GET all properties
router.get(
  "/",
  [
    query("island").optional().trim().escape(),
    query("minRating")
      .optional()
      .isFloat({ min: 1, max: 5 })
      .withMessage("Minimum rating must be between 1 and 5."),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation failed.",
          errors: errors.array(),
        });
      }

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
  }
);

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
router.post(
  "/:id/reviews",
  [
    body("guestName")
      .trim()
      .notEmpty()
      .withMessage("Guest name is required.")
      .isLength({ max: 60 })
      .withMessage("Guest name must be 60 characters or less.")
      .escape(),

    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5."),

    body("comment")
      .trim()
      .notEmpty()
      .withMessage("Comment is required.")
      .isLength({ max: 300 })
      .withMessage("Comment must be 300 characters or less.")
      .escape(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation failed.",
          errors: errors.array(),
        });
      }

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
  }
);

module.exports = router;