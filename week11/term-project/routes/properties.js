const express = require("express");
const router = express.Router();
const Property = require("../models/Property");

router.get("/properties", async (req, res) => {
  try {
    const filter = {};

    if (req.query.island) {
      filter.island = req.query.island;
    }

    if (req.query.minRating) {
      filter["reviews.rating"] = { $gte: Number(req.query.minRating) };
    }

    const properties = await Property.find(filter);
    res.render("properties", { properties });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.get("/properties/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/properties/:id/reviews", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    property.reviews.push({
      guestName: req.body.guestName,
      rating: req.body.rating,
      comment: req.body.comment
    });

    await property.save();

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;