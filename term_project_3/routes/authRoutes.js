const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({
    message: "Login successful",
    user: {
      email: req.user.email,
      role: req.user.role,
    },
  });
});

router.post("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) return next(error);

    res.json({ message: "Logout successful" });
  });
});

router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      loggedIn: true,
      user: {
        email: req.user.email,
        role: req.user.role,
      },
    });
  }

  res.json({ loggedIn: false });
});

module.exports = router;