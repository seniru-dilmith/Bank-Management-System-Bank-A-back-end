const express = require('express');
const dotenv = require('dotenv');
const customerDetails = require('./routes/customerDetails');

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();
app.use(express.json());  // Parse JSON request bodies
app.use(customerDetails);  // Use the test-db route

// Set up port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
