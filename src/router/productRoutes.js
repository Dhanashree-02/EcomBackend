const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer.middleware'); // Import updated middleware
const { uploadProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');

// ✅ Upload Multiple Images & Save Product
router.post('/upload', upload.array('images', 10), uploadProduct);
// ✅ Get All Products
router.get('/', getAllProducts);

// ✅ Get Product by ID
router.get('/:id', getProductById);

// ✅ Update Product (with optional images)
router.put('/:id', upload.array('images', 5), updateProduct);

// ✅ Delete Product
router.delete('/:id', deleteProduct);

module.exports = router;
