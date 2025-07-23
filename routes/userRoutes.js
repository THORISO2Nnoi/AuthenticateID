const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/verify-id', async (req, res) => {
    try {
        const { idNumber, firstName, lastName, dateOfBirth } = req.body;

        if (!idNumber || !firstName || !lastName || !dateOfBirth) {
            return res.status(400).json({ success: false, message: "Missing fields" });
        }

        const user = await User.findOne({ idNumber });

        if (!user) {
            return res.status(404).json({ success: false, message: "ID not found" });
        }

        if (
            user.firstName.toLowerCase() === firstName.toLowerCase() &&
            user.lastName.toLowerCase() === lastName.toLowerCase() &&
            user.dateOfBirth === dateOfBirth
        ) {
            return res.status(200).json({ success: true, message: "User verified successfully" });
        } else {
            return res.status(401).json({ success: false, message: "Details do not match" });
        }
    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
