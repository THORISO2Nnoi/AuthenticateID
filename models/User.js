const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  idNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true }
}, { collection: 'UserID' });

module.exports = mongoose.model('User', UserSchema);
