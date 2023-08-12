const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    rating: Number,
    price: Number,
    type: String,
    category: String,
    images: Array,
    color: Array

    
})
const Product = mongoose.model('Producte', productSchema);
module.exports = Product