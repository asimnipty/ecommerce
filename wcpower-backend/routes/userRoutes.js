const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});
const { 
  authUser, 
  registerUser, 
  getUserProfile 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Route for registration: POST /api/users
router.post('/', registerUser);

// Route for login: POST /api/users/login
router.post('/login', authUser);

// Route for profile: GET /api/users/profile
// Notice we use 'protect' middleware here to lock this route!
router.get('/profile', protect, getUserProfile);

module.exports = router;