const db = require('../config/db'); // assuming a MySQL database

exports.getAccounts = async (req, res) => {
  try {
    const customerId = req.user.id; // Assume user ID is available in the request from JWT middleware
    const [accounts] = await db.query('SELECT * FROM account WHERE customer_id = ?', [customerId]);
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
};
