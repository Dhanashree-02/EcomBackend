const Product = require('../modals/productModal.js');
const cloudinary = require('../utils/cloudinary.js');

// Upload multiple images and create product
const uploadProductImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        const { title, description, price, categories, star } = req.body;
        if (!title || !description || !price || !categories || !star) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Upload images to Cloudinary
        const uploadedImages = await Promise.all(
            req.files.map(async (file) => {
                const result = await new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: 'products' },
                        (error, result) => {
                            if (error) return reject(error);
                            resolve(result.secure_url);
                        }
                    );
                    stream.end(file.buffer);
                });

                return result;
            })
        );

        // Save product
        const newProduct = new Product({
            title,
            description,
            price,
            categories,
            star,
            images: uploadedImages
        });

        await newProduct.save();

        res.status(201).json({ message: 'Product uploaded successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading images', error: error.message });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

// Update product by ID
const updateProduct = async (req, res) => {
    try {
        const { title, description, price, categories, star } = req.body;

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // If new images are uploaded, update images
        let uploadedImages = product.images;
        if (req.files && req.files.length > 0) {
            uploadedImages = await Promise.all(
                req.files.map(async (file) => {
                    const result = await new Promise((resolve, reject) => {
                        const stream = cloudinary.uploader.upload_stream(
                            { folder: 'products' },
                            (error, result) => {
                                if (error) return reject(error);
                                resolve(result.secure_url);
                            }
                        );
                        stream.end(file.buffer);
                    });

                    return result;
                })
            );
        }

        // Update product details
        product.title = title || product.title;
        product.description = description || product.description;
        product.price = price || product.price;
        product.categories = categories || product.categories;
        product.star = star || product.star;
        product.images = uploadedImages;

        await product.save();

        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete product by ID
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

module.exports = {
    uploadProductImages,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
