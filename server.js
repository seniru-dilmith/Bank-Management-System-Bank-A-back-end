const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // for parsing JSON request bodies
app.use(cors()); // enable CORS

// Test DB connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Database connected successfully');
    }
});

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes (e.g., login)
app.use('/api/accounts', accountRoutes);  // Account-related routes

// Basic route to check server status
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Set up port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
