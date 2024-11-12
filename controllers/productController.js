const Product = require("../models/Product")

const createNewProduct =async (req,res)=>{
    const {name,price,category,image}=req.body
    console.log(req.user)
    if(!name||!price||!category)
    {
        return res.status(400).send("Fildes is required")
    }
    const isProductnameExists=await Product.findOne({name}).lean()
    if(isProductnameExists)
        return res.status(400).send("productname is not valid")
    const product = await Product.create({name,price,image,category})
    if(!product){
        return res.status(400).json({message:'creating Product failed'})
    }
    else{
        return res.status(201).json({message:'new Product created'})
    }
}

const getAllProducts = async (req,res)=>{
    const Products = await Product.find().lean()
    if(!Products.length){
        return res.status(400).json({message:'No Products found'})
    } 
    res.json(Products)
}
const updateProduct = async (req,res)=>{
    const {_id,name,category,price,image} = req.body
    if(!_id||!name||!category||!price)
        return res.status(400).send("id and Categoryname are require!")
    const product =await Product.findById(_id).exec()
    if(!product)
        return res.status(400).send(`Product with id ${_id} not exists`)
        product.name=name
        product.category=category
        product.price=price
        product.image=image

    const updatedProduct = await product.save()
    res.json(`'${updatedProduct.name}' updated`)
}
const deleteProduct = async (req,res)=>{
    const {_id,name} = req.body
    const product = await Product.findById(_id).exec()
    if(!product)
        return res.status(400).send(`Product with id ${_id} not exists`)
    const deletedProduct = await product.deleteOne()
    const reply=(`Product '${deletedProduct.name}' ID '${deletedProduct._id}' deleted`)
    res.json(reply)
}

module.exports = {
    createNewProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}