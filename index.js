const express = require('express')
const connection = require('./config/mongo')
const Product = require('./model/products')
const Cart = require('./model/cart.model')
const Wish = require('./model/wish.model')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cors())
app.get('/products',async (req,res)=>{
   
    // console.log(req.query);
    let filteration = {}
    let sortation = {}
    if(req.query.category){
        filteration.category = req.query.category
    }
    if(req.query.price_gte){
        filteration.price = {$gte: req.query.price_gte, $lte:  req.query.price_lte}
    }
    if(req.query.color_like){
        if(typeof req.query.color_like=="string"){
            filteration.color = req.query.color_like
        }
        else{
            filteration.color ={ $in: req.query.color_like}
        }
    }
    if(req.query._sort){
        sortation.price = req.query._order=="asc"?1:-1
    }
    if(req.query.id_gte){
        filteration.id = {$gte: req.query.id_gte, $lte:  req.query.id_lte}
    } 
   
    const totalItems = await Product.find(filteration).count()
    const found = await Product.find(filteration).sort(sortation).skip((req.query._page-1)*req.query._limit).limit(req.query._limit)
res.header("X-Total-Count", totalItems)
res.send(found)
})


app.get('/products/:id',async(req,res)=>{
    console.log(req.params);
    const found = await Product.find(req.params)
    res.send(found)
})



app.get('/cart',async(req,res)=>{
    const found = await Cart.find({})
    res.send(found)
})

app.post('/cart',async(req,res)=>{
    const toCart = new Cart(req.body)
    try {
        await toCart.save()
        res.send('item added to cart')
    } catch (error) {
        console.log(error);
        res.send('something went wrong will adding')
    }
})

app.delete('/cart/:id',async(req,res)=>{
    try {
        await Cart.deleteOne(req.params)
        res.send('item deleted')
    } catch (error) {
        console.log(error);
        res.send('something went wrong while deleting')
    }
})







app.get('/wishList',async(req,res)=>{
    const found = await Wish.find({})
    res.send(found)
})

app.post('/wishList',async(req,res)=>{
    const towish = new Wish(req.body)
    try {
        await towish.save()
        res.send('item added to wishlist')
    } catch (error) {
        console.log(error);
        res.send('something went wrong will adding')
    }
})

app.delete('/wishList/:id',async(req,res)=>{
    try {
        await Wish.deleteOne(req.params)
        res.send('item deleted')
    } catch (error) {
        console.log(error);
        res.send('something went wrong while deleting')
    }
})






app.listen('8080',async()=>{
    try {
       await connection
        console.log('connected to db');
    } catch (error) {
        console.log(error);
    }
    console.log('listing on port 8080');
})