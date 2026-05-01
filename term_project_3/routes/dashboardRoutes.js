const express = require("express");
const router = express.Router();

const dashboardData = {
  Oahu: {
    city: "Honolulu",
    arrivals: [684, 712, 798, 820, 845, 833],
    origin: {
      domestic: 72,
      japan: 14,
      canada: 6,
      other: 8,
    },
    metrics: {
      adr: 315,
      occupancy: 82,
      avgStay: 5.6,
    },
  },
  Maui: {
    city: "Kahului",
    arrivals: [210, 230, 260, 275, 290, 285],
    origin: {
      domestic: 80,
      japan: 5,
      canada: 8,
      other: 7,
    },
    metrics: {
      adr: 425,
      occupancy: 76,
      avgStay: 6.2,
    },
  },
  Kauai: {
    city: "Lihue",
    arrivals: [120, 135, 150, 160, 172, 168],
    origin: {
      domestic: 84,
      japan: 3,
      canada: 7,
      other: 6,
    },
    metrics: {
      adr: 385,
      occupancy: 74,
      avgStay: 6.8,
    },
  },
  Hawaii: {
    city: "Hilo",
    arrivals: [145, 155, 170, 185, 190, 188],
    origin: {
      domestic: 78,
      japan: 7,
      canada: 6,
      other: 9,
    },
    metrics: {
      adr: 295,
      occupancy: 70,
      avgStay: 6.4,
    },
  },
};

router.get("/", (req, res) => {
  const island = req.query.island || "Oahu";
  const data = dashboardData[island];

  if (!data) {
    return res.status(404).json({ message: "Island data not found" });
  }

  res.json(data);
});

module.exports = router;