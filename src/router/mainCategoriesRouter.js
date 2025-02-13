const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer.middleware'); 
const { 
    uploadmainCategoriesModalImages, 
    getAllmainCategories, 
    getmainCategoriesById, 
    updatemainCategories, 
    deletemainCategories 
} = require('../controllers/mainCategoriesController.js');

// Routes
router.post('/upload', upload.array('images', 5), uploadmainCategoriesModalImages); 
router.get('/mainCategories', getAllmainCategories);
router.get('/mainCategories/:id', getmainCategoriesById);
router.put('/mainCategories/:id', upload.array('images', 5), updatemainCategories);
router.delete('/mainCategories/:id', deletemainCategories);

module.exports = router;
