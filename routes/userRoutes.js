const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/verify
router.post('/verify', async (req, res) => {
  console.log('Verify route called with body:', req.body);

  try {
    const { idNumber, firstName, lastName, dob } = req.body;

    if (!idNumber || !firstName || !lastName || !dob) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    // Convert dob string to Date for query if dob stored as Date in MongoDB
    const dobDate = new Date(dob);

    // Find user matching all fields exactly
    const user = await User.findOne({ idNumber, firstName, lastName, dob: dobDate });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User verified', user });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
