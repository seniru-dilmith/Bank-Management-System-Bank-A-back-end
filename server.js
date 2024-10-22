const express = require('express');
const dotenv = require('dotenv');
const customerDetails = require('./routes/customerDetails');
const appService = require('./services/appService')
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed HTTP methods
    credentials: true,  // If you are using cookies or sessions
  }));
  

app.use(express.json());  // Parse JSON request bodies
app.use(customerDetails);  // Use the test-db route
app.use(appService); // Use the appService route

// Set up port from environment variables or default to 5000
const PORT = process.env.PORT || process.env.BACKEND_PORT;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
