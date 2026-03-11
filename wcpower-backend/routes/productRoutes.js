const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProductById 
} = require('../controllers/productController');

// Route to get all products: GET /api/products
router.route('/').get(getProducts);

// Route to get a single product: GET /api/products/:id
router.route('/:id').get(getProductById);

// @desc    Fetch single product
// @route   GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Invalid Product ID or Server Error' });
  }
});

// CRITICAL: This is the line that was missing!
module.exports = router;