const multer = require("multer");
const path = require("path");

// Configure multer storage (temporary storage before uploading to Cloudinary)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Temporary folder for uploads
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

// Initialize multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
