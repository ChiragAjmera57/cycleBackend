const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
    id: Number,
    name: String,
    rating: Number,
    price: Number,
    type: String,
    category: String,
    images: Array,
    color: Array

    
})
const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart