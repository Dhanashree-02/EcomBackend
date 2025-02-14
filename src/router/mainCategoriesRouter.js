const express = require('express');
const router = express.Router();
const {
    createMainCategory,
    getAllMainCategories,
    getMainCategoryById,
    updateMainCategory,
    deleteMainCategory
} = require('../controllers/mainCategoriesControllers.js');
const upload = require('../middlewares/Mmulter.middleware.js'); // Ensure multer is set up

// Routes
router.post('/add', upload.array('images'), createMainCategory);
router.get('/all', getAllMainCategories);
router.get('/:id', getMainCategoryById);
router.put('/update/:id', upload.array('images'), updateMainCategory);
router.delete('/delete/:id', deleteMainCategory);

module.exports = router;
