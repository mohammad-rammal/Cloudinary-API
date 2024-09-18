const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide product name'],
        trim: true,
        minlength: [3, 'Product name must be at least 3 characters long'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price'],
        min: [0, 'Price must be a positive number'],
    },
    image: {
        type: String,
        required: [true, 'Please provide an image path'],
    },
});

module.exports = mongoose.model('Product', ProductSchema);
