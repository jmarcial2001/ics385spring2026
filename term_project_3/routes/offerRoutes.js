const express = require("express");
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
router.post("/", isAuthenticated, async (req, res) => {
  try {
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
});

module.exports = router;