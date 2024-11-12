//פונקצית החיבור למסד הנתונים
const mongoose =require("mongoose")

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI)
    }
    catch(err)
    {
        console.log("Error connection to DB "+ err)
    }
}
module.exports = connectDB