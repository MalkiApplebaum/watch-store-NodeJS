const mongoose =require("mongoose")
const CategorySchema = new mongoose.Schema({
    Categoryname:{
        type:String,
        required:true,
        unique:true,
    },
},{
    timestamps:true
})

module.exports = mongoose.model('Category',CategorySchema)