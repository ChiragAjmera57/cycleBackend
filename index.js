const express = require('express')
const connection = require('./config/mongo')
const Product = require('./model/products')



const app = express()
app.use(express.json())

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
   
    const found = await Product.find(filteration).sort(sortation)
   
res.send(found)
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