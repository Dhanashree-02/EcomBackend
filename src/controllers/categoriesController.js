const Categories = require("../modals/categoriesModal.js");
const cloudinary = require("../config/cloudinary.js");

// Upload Images to Cloudinary
const uploadImages = async (files) => {
    const uploadPromises = files.map(file => {
        return cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
            if (error) {
                throw new Error("Image upload failed");
            }
            return result.secure_url;
        }).end(file.buffer);
    });
    return await Promise.all(uploadPromises);
};

// Create Category Controller
const createCategory = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "At least one image is required" });
        }

        const imageUrls = await uploadImages(req.files);
        
        const { title, description, price, categories, star } = req.body;
        
        const newCategory = new Categories({
            images: imageUrls,
            title,
            description,
            price,
            categories,
            star
        });
        
        await newCategory.save();
        res.status(201).json({ message: "Category created successfully", category: newCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createCategory };
