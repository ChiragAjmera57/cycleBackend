const mongoose = require('mongoose')
const wishSchema = new mongoose.Schema({
    id: Number,
    name: String,
    rating: Number,
    price: Number,
    type: String,
    category: String,
    images: Array,
    color: Array

    
})
const Wish = mongoose.model('Wish', wishSchema);
module.exports = Wish
