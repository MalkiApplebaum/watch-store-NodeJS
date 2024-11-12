const mongoose=require("mongoose")
const basketSchema = new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.String,
        required:true,
        ref:"User"
    },
    count:{
        type:Number,
        required:true
    },
    product:{
        type:String,
        required:true,
        ref:"Product"
    },
   
   
},{
    timestamps:true,
})

module.exports = mongoose.model('Basket',basketSchema)