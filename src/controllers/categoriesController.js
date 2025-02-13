const Categories = require("../modals/categoriesModal.js")
const cloudinary = require('../utils/cloudinary.js');

// Upload Image Function
const uploadCategoriesImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Upload image to Cloudinary in 'Categories' folder
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'Categories'
        });


        // Validate required fields
        const { title, description, price, categories, star } = req.body;

        if (!title || !description || !price || !categories || !star) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Save image URL and Categories details
        const newCategories = new Categories({ 
            title, 
            description, 
            price, 
            categories, 
            star, 
            image: result.secure_url 
        });

        await newCategories.save();

        res.status(201).json({ message: 'Image uploaded successfully', Categories: newCategories });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
};

module.exports = { uploadCategoriesImage };