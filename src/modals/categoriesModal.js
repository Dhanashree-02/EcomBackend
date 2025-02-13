const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
},
);
module.exports = mongoose.model('Categories', categoriesSchema);