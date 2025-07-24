const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ POST /api/register — add user to DB
router.post('/register', async (req, res) => {
  try {
    const { idNumber, firstName, lastName, dob } = req.body;

    if (!idNumber || !firstName || !lastName || !dob) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const existing = await User.findOne({ idNumber });
    if (existing) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const newUser = new User({
      idNumber,
      firstName,
      lastName,
      dob: new Date(dob)  // store as actual Date
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "User registered", user: newUser });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ POST /api/verify — check if user exists
router.post('/verify', async (req, res) => {
  try {
    const { idNumber, firstName, lastName, dob } = req.body;

    if (!idNumber || !firstName || !lastName || !dob) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const user = await User.findOne({
      idNumber,
      firstName,
      lastName,
      dob: new Date(dob) // match Date format
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User verified", user });

  } catch (error) {
    console.error("Verify error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
