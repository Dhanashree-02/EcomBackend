const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.middleware.js");
const { createmainCategory } = require("../controllers/mainCategoriesControllers.js");

// Route to create a category
router.post("/maincategories", upload.array("images", 5), createmainCategory);

module.exports = router;