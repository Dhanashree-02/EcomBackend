const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer.middleware'); 
const { 
    uploadProductImages, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController.js');

// Routes
router.post('/upload', upload.array('images', 5), uploadProductImages); 
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', upload.array('images', 5), updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
