const express = require("express");
const router = express.Router();
const upload = require("../middlewares/mainmulter.middleware");
const { createCategory } = require("../controllers/categoryController");

// Route to create a category
router.post("/categories", upload.array("images", 5), createCategory);

module.exports = router;