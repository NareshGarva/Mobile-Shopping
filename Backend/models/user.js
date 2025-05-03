const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER, // ✅ Correct usage
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
























// const express = require('express');
// const bcrypt = require('bcrypt');
// const router = express.Router();
// const User = require('../models/user'); // Sequelize model

// // Register API
// router.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword });

//     res.status(201).json({ message: 'Account created successfully', user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error registering user' });
//   }
// });

// // Login API
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { email } });
//     if (!user) return res.status(400).json({ message: 'Invalid email or password' });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ message: 'Invalid email or password' });

//     res.status(200).json({ message: 'Login successful', user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error logging in' });
//   }
// });

// module.exports = router;
