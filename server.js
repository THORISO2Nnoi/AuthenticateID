const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

// Middleware order is very important
app.use(cors());
app.use(express.json());  // parse JSON bodies

// Logging middleware to debug incoming requests
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  console.log('Request body:', req.body);
  next();
});

// Routes
app.use('/api', userRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  // these options are deprecated and no longer needed with current drivers
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection failed:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
