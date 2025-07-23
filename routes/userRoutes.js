const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/verify', async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    const { idNumber, firstName, lastName, dob } = req.body;

    if (!idNumber || !firstName || !lastName || !dob) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // Find by idNumber only, verify rest manually (better performance)
    const user = await User.findOne({ idNumber });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (
      user.firstName.toLowerCase() === firstName.toLowerCase() &&
      user.lastName.toLowerCase() === lastName.toLowerCase() &&
      user.dob === dob
    ) {
      return res.status(200).json({ success: true, message: "User verified" });
    } else {
      return res.status(401).json({ success: false, message: "Details do not match" });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
