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
    origin: 'http://localhost:3000',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    credentials: true,  
  }));
  

app.use(express.json());  
app.use(customerDetails);  
app.use(appService);

// Set up port from environment variables or default to 5000
const PORT = process.env.PORT || process.env.BACKEND_PORT;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
