const Basket = require("../models/Basket")
const Product = require("../models/Product")
const  User= require("../models/User")


const AddProductToBasket=async(req,res)=>{
    const {count,product} = req.body
    if(!product)
    {
        return res.status(400).send("product is required!")
    }

    const userId=await User.findOne({username:req.user._id}).exec()
    if(userId)
    {
        userId.count=userId.count+count
        await userId.save()
        return res.status(201).json({message:'update count)'})
    }
    else
    {
    const NewItem=await Basket.create({count,product,username:req.user._id})
        if(NewItem){
         return res.status(201).json({message:'new Item added to the Cart:)'})
        }
     
        else{
          return res.status(400).json({message:'invalided Item'})
        }
    }
}


const getAllItems = async (req,res)=>{
    
    const items = await Basket.find({username:req.user._id}).lean()
    if(!items.length){
        return res.status(400).json({message:'No items found'})
    } 
    res.json(items)
}

const deleteItem = async (req,res)=>{
    const {_id} = req.body
    const item = await Basket.findById(_id).exec()
    if(!item)
        return res.status(400).send(`Product with id ${_id} not exists`)
    const deletedItem = await item.deleteOne()
    res.json(`Product '${deletedItem.name}' ID '${deletedItem._id}' deleted`)
}

// const updateCountOfItems = async (req,res)=>{
//     const {_id,count} = req.body
//     const basket = await Basket.findById(_id).exec()
//     if(!basket)
//         return res.status(400).send(`Product with id ${_id} not exists`)
//         basket.count=count
//     const updateCount=await basket.save()

//     res.json(`'Product ID:${updateCount._id},' updated:)`)

// }


module.exports = {
    AddProductToBasket,
    getAllItems,
    deleteItem,
   // updateCountOfItems


}