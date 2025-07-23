const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  idNumber: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: String, required: true } // Format YYYY-MM-DD
});

module.exports = mongoose.model('User', userSchema);
