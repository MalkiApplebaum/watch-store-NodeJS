const mongoose =require("mongoose")
const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
        },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    image:{
        type:String
    
    },
   
},{
    timestamps:true
})

module.exports = mongoose.model('Product',ProductSchema)