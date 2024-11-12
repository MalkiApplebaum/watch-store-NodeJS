//http://localhost:7002/api/auth/login
require("dotenv").config()
const express=require("express")
const cors=require("cors")
const corsOptions=require("./config/cors")
const connectDB = require("./config/dbConn")//חיבור למסד הנתונים
const mongoose = require("mongoose")
const PORT = process.env.PORT||7001
const app=express()

connectDB()

//midleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.use('/api/category', require("./routes/categoryroute"))
app.use('/api/auth', require("./routes/authRoute"))
app.use('/api/product', require("./routes/productRoute"))
app.use('/api/basket', require("./routes/basketRoute"))

//routes
console.log(process.env.NODE_ENV)
mongoose.connection.once('open',()=>{
    console.log("connected to MongoDB")
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    })
})
mongoose.connection.on('error',err=>{
    console.log(err)
})
