const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const hardcodedUser = {
  idNumber: "1234567890123",
  firstName: "John",
  lastName: "Doe",
  dob: "1990-01-01"
};

app.post('/api/verify', (req, res) => {
  const { idNumber, firstName, lastName, dob } = req.body;

  if (!idNumber || !firstName || !lastName || !dob) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  if (
    idNumber === hardcodedUser.idNumber &&
    firstName.toLowerCase() === hardcodedUser.firstName.toLowerCase() &&
    lastName.toLowerCase() === hardcodedUser.lastName.toLowerCase() &&
    dob === hardcodedUser.dob
  ) {
    return res.status(200).json({ success: true, message: "User verified successfully" });
  } else {
    return res.status(401).json({ success: false, message: "Details do not match" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
