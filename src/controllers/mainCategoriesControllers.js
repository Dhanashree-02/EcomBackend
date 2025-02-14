const MainCategories = require('../modals/mainCategoriesModal.js');
const cloudinary = require('../utils/cloudinary.js');

// Create a new main category
const createMainCategory = async (req, res) => {
    try {
        let images = [];

        if (req.files) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path);
                images.push(result.secure_url);
            }
        }

        const mainCategory = new MainCategories({
            images,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            categories: req.body.categories,
            star: req.body.star
        });

        await mainCategory.save();
        res.status(201).json({ message: "Category created successfully", data: mainCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all main categories
const getAllMainCategories = async (req, res) => {
    try {
        const categories = await MainCategories.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a category by ID
const getMainCategoryById = async (req, res) => {
    try {
        const category = await MainCategories.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a category by ID
const updateMainCategory = async (req, res) => {
    try {
        let images = [];

        if (req.files) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path);
                images.push(result.secure_url);
            }
        }

        const updatedCategory = await MainCategories.findByIdAndUpdate(
            req.params.id,
            {
                images: images.length > 0 ? images : req.body.images,
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                categories: req.body.categories,
                star: req.body.star
            },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category updated successfully", data: updatedCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a category by ID
const deleteMainCategory = async (req, res) => {
    try {
        const deletedCategory = await MainCategories.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Export all functions
module.exports = {
    createMainCategory,
    getAllMainCategories,
    getMainCategoryById,
    updateMainCategory,
    deleteMainCategory
};
