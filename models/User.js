const mongoose =require("mongoose")
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        lowercase:true,
       
    },
    phone:{
        type:String,
        //required:true
    },
    roles:{
        type:String,
        default:'user',
        enum:['user','admin']
    },
    active:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('User',UserSchema)