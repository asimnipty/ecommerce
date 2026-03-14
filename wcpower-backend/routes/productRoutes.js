const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProductById, 
  createProductReview 
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// Route for getting all products
router.route('/').get(getProducts);

// Route for reviews (Protected)
router.route('/:id/reviews').post(protect, createProductReview);

// Line 12 - Route for a single product
router.route('/:id').get(getProductById);

module.exports = router;