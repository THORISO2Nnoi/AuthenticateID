const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/verify
router.post('/verify', async (req, res) => {
  try {
    const { idNumber, firstName, lastName, dob } = req.body;

    if (!idNumber || !firstName || !lastName || !dob) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // Find user by all fields (exact match)
    const user = await User.findOne({ idNumber, firstName, lastName, dob });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User verified", user });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
