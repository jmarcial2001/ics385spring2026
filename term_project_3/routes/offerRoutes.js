const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Offer = require("../models/Offer");
const isAuthenticated = require("../middleware/isAuthenticated");

// Public route: get active offer
router.get("/active", async (req, res) => {
  try {
    const offer = await Offer.findOne({ active: true }).sort({ createdAt: -1 });
    res.json(offer);
  } catch (error) {
    res.status(500).json({ message: "Error getting offer", error });
  }
});

// Admin route: create offer
router.post(
  "/",
  isAuthenticated,
  [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Offer title is required.")
      .isLength({ max: 80 })
      .withMessage("Offer title must be 80 characters or less.")
      .escape(),

    body("message")
      .trim()
      .notEmpty()
      .withMessage("Offer message is required.")
      .isLength({ max: 300 })
      .withMessage("Offer message must be 300 characters or less.")
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

      const { title, message } = req.body;

      await Offer.updateMany({}, { active: false });

      const offer = await Offer.create({
        title,
        message,
        active: true,
      });

      res.status(201).json(offer);
    } catch (error) {
      res.status(500).json({ message: "Error creating offer", error });
    }
  }
);

module.exports = router;