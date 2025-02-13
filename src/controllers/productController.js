const Product = require('../modals/productModal.js'); // Import the product model

// ✅ Upload images to Cloudinary & Save product details
const uploadProduct = async (req, res) => {
    try {
        console.log('Received files:', req.files); // Debugging: Check if multiple files are received

        if (!req.files || req.files.length === 0) { 
            return res.status(400).json({ message: "No images uploaded" });
        }

        // Extract image URLs correctly
        const imageUrls = req.files.map(file => file.path); 

        console.log('Image URLs:', imageUrls); // Debugging: Ensure all images are processed

        const { title, description, price, categories, star } = req.body;

        const newProduct = new Product({
            images: imageUrls, 
            title,
            description,
            price,
            categories,
            star
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product uploaded successfully', product: newProduct });

    } catch (error) {
        console.error('Error uploading product:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// ✅ Get All Products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// ✅ Get Product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// ✅ Update Product by ID
const updateProduct = async (req, res) => {
    try {
        const { title, description, price, categories, star } = req.body;

        const updatedData = { title, description, price, categories, star };

        if (req.files && req.files.length > 0) {
            updatedData.images = req.files.map(file => file.path || file.url);
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// ✅ Delete Product by ID
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// ✅ Export controllers
module.exports = { 
    uploadProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
};
