const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST: Verify ID
router.post('/verify', async (req, res) => {
  try {
    const { idNumber, firstName, lastName, dob } = req.body;

    if (!idNumber || !firstName || !lastName || !dob) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const user = await User.findOne({ idNumber, firstName, lastName, dob });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User verified", user });

  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
