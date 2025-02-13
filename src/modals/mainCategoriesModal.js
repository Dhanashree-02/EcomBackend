const mongoose = require('mongoose');

const mainCategoriesSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },

},
);
module.exports = mongoose.model('mainCategories', mainCategoriesSchema);