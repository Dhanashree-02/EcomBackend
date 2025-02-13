const express = require('express');
const router = express.Router();
const { uploadCategoriesImage } = require('../controllers/categoriesController.js');  
const upload = require('../middlewares/multer.middleware.js'); 

router.post('/Categories', upload.single('image'), uploadCategoriesImage);

module.exports = router;
