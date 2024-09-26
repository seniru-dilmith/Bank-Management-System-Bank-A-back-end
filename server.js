const express = require('express');
const dotenv = require('dotenv');
const customerDetails = require('./routes/customerDetails');
const appService = require('./services/appService')
const transactionRoutes = require('./routes/transactionRoutes');
const accountSummaryRoutes = require('./routes/accountSummaryRoutes');


// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

app.use(express.json());  // Parse JSON request bodies
app.use(customerDetails);  // Use the test-db route
app.use(appService); // Use the appService route
app.use(transactionRoutes);
app.use(accountSummaryRoutes); 

// Set up port from environment variables or default to 5000
const PORT = process.env.PORT || process.env.BACKEND_PORT;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
