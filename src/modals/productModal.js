const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    images:[ {
        type: String,
        required: true
    }],
    title: {
        type: String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
   
    categories : {
        type : String,
        required : true
    },
    star : {
        type : String,
        required : true
    }

},
);
module.exports = mongoose.model('Product', productSchema);