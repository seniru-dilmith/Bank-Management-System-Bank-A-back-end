const bcrypt = require('bcryptjs');

// Function to hash a password
const hashPassword = async (plainPassword) => {
  try {
    // Salt rounds define the cost of processing the data, more rounds are more secure but slower
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    console.log(hashedPassword);
  } catch (error) {
    console.error('Error hashing the password', error);
  }
};

hashPassword('password246');
