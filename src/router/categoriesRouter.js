const express = require("express");
const router = express.Router();
const upload = require("../middlewares/Cmulter.middleware.js");
const { 
    addCategory, 
    getCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
} = require("../controllers/categoriesController.js");

// ✅ Route to add a new category with image uploads
router.post("/add-category", upload.array("images", 5), addCategory);

// ✅ Route to get all categories
router.get("/categories", getCategories);

// ✅ Route to get a single category by ID
router.get("/category/:id", getCategoryById);

// ✅ Route to update a category by ID
router.put("/update-category/:id", upload.array("images", 5), updateCategory);

// ✅ Route to delete a category by ID
router.delete("/delete-category/:id", deleteCategory);

module.exports = router;
