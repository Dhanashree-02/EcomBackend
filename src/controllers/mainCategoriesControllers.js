const Categories = require("../modals/mainCategoriesModal.js");
const cloudinary = require("../utils/cloudinary.js");

const createCategory = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "Please upload at least one image." });
        }

        // Upload images to Cloudinary and store URLs
        const imageUrls = await Promise.all(
            req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, { folder: "categories" });
                return result.secure_url;
            })
        );

        // Create category with image URLs
        const newCategory = new Categories({
            images: imageUrls, // Store only URLs, not streams
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            categories: req.body.categories,
            star: req.body.star,
        });

        await newCategory.save();
        res.status(201).json({ message: "Category created successfully", category: newCategory });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createCategory };