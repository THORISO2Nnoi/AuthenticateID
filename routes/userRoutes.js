const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST: Verify ID
router.post('/verify', async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    const { idNumber, firstName, lastName, dob } = req.body;

    if (!idNumber || !firstName || !lastName || !dob) {
      console.log("Missing fields");
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    console.log("Searching for user:", { idNumber, firstName, lastName, dob });

    const user = await User.findOne({ idNumber, firstName, lastName, dob });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("User found:", user);

    res.json({ success: true, message: "User verified", user });

  } catch (error) {
    console.error("Server error in /verify:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
