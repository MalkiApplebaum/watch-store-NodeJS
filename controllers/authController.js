const bcrypt=require('bcrypt')
const User=require("../models/User")
const jwt=require('jsonwebtoken')

const login = async (req,res)=>{
    const {username,password}=req.body
    if(!username||!password){
        return res.status(400).json({message:'All fields are required'})
    }
        const foundUser=await User.findOne({username}).lean()
        if(!foundUser||!foundUser.active){
            return res.status(401).json({message:'Unauthorized'})
        }
        const match = await bcrypt.compare(password,foundUser.password)
        if(!match)return res.status(401).json({message:'Unauthorized'})


        const userInfo={_id:foundUser._id,name:foundUser.name,
            roles:foundUser.roles,username:foundUser.username,email:foundUser.email}
        const accessToken=jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)


        res.json({accessToken:accessToken})
       //res.json("Logged In")
    
    
}
    
const register=async(req,res)=>{
    const{username,password,name,email,phone}=req.body
    if(!name||!username||!password){
        return res.status(400).json({message:'all field are required'})}
        
        const duplicate= await User.findOne({username:username}).lean()
        if(duplicate){
            return res.status(409).json({message:'duplicate username'})}

        const hashedPwd=await bcrypt.hash(password,10)
        const userObject={name,email,username,phone,password:hashedPwd}
        const user= await User.create(userObject)
        if (user){
            return res.status(201).json({message:`new user ${user.username} created`})
          }  else{
            return res.status(400).json({message:'invaild user received'})
        }
}

module.exports={login,register}
