const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register user
router.post('/register', async (req, res) => {
  try {
    const { idNumber, firstName, lastName, dob } = req.body;

    if (!idNumber || !firstName || !lastName || !dob) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const existingUser = await User.findOne({ idNumber });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const newUser = new User({ idNumber, firstName, lastName, dob: new Date(dob) });
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered", user: newUser });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Verify user
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
      dob: new Date(dob)
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
