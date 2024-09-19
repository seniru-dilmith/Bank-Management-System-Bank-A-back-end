const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables from a .env file into process.env

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = pool.promise();  // Export the pool for use in our application
