const Category = require("../modals/categoriesModal.js");

// ✅ Add a new category with image uploads
const addCategory = async (req, res) => {
    try {
        const { title, description, price, categories, star } = req.body;
        
        // Extract Cloudinary URLs from uploaded files
        const imageUrls = req.files.map(file => file.path);

        // Create new category with image URLs
        const newCategory = new Category({
            images: imageUrls,
            title,
            description,
            price,
            categories,
            star
        });

        await newCategory.save();

        res.status(201).json({
            message: "Category added successfully!",
            data: newCategory
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get a category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Update a category by ID
const updateCategory = async (req, res) => {
    try {
        const { title, description, price, categories, star } = req.body;
        
        // Extract Cloudinary URLs from uploaded files if new images are uploaded
        const imageUrls = req.files ? req.files.map(file => file.path) : undefined;

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                price,
                categories,
                star,
                ...(imageUrls && { images: imageUrls }) // Update images only if new ones are uploaded
            },
            { new: true } // Return the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({
            message: "Category updated successfully!",
            data: updatedCategory
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Delete a category by ID
const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { 
    addCategory, 
    getCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
};
