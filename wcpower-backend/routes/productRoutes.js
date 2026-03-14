const express = require('express');
const router = express.Router();
const { 
    getProducts, 
    getProductById, 
    createProductReview 
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// @desc    Fetch all products
// @route   GET /api/products
router.route('/').get(getProducts);

// @desc    Create new review
// @route   POST /api/products/:id/reviews
router.route('/:id/reviews').post(protect, createProductReview);

// @desc    Fetch single product
// @route   GET /api/products/:id
router.route('/:id').get(getProductById);

module.exports = router;