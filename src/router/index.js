const express = require('express');
const router = express.Router();
const productRoutes = require('./productRoutes.js'); // Import product routes

router.use('/products', productRoutes); // Use productRoutes for product-related routes

// router.use('/categories', require('./categoryRoutes'));
// router.use('/main-categories', require('./mainCategoryRoutes'));

module.exports = router;
