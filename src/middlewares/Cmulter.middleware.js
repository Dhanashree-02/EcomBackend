const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary.js");

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "categories",  // Cloudinary folder name where images will be stored
        allowed_formats: ["jpg", "png", "jpeg"]
    }
});

const upload = multer({ storage });

module.exports = upload;
