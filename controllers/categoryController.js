const Category = require("../models/Category")

const createNewCategory =async (req,res)=>{
    const {Categoryname}=req.body
    console.log(req.user)
    if(!Categoryname)
    {
        return res.status(400).send("Categoryname is required")
    }
    const isUserCategorynameExists=await Category.findOne({Categoryname}).lean()
    if(isUserCategorynameExists)
        return res.status(400).send("Categoryname is not valid")
    const category = await Category.create({Categoryname})
    if(!category){
        return res.status(400).json({message:'creating Category failed'})
    }
    else{
        return res.status(201).json({message:'new Category created'})
    }
}

const getAllCategorys = async (req,res)=>{
    const categorys = await Category.find().lean()
    if(!categorys.length){
        return res.status(400).json({message:'No Categorys found'})
    } 
    res.json(categorys)
}
const updateategorys = async (req,res)=>{
    const {_id,Categoryname} = req.body
    if(!_id||!Categoryname)
        return res.status(400).send("id and Categoryname are require!")
    const category =await Category.findById(_id).exec()
    if(!category)
        return res.status(400).send(`categorys with id ${_id} not exists`)
        category.Categoryname=Categoryname

    const updatedCategory = await category.save()
    res.json(`'${updatedCategory.Categoryname}' updated`)
}
const deleteCategory = async (req,res)=>{
    const {_id} = req.body
    const category = await Category.findById(_id).exec()
    if(!category)
        return res.staus(400).send(`category with id ${_id} not exists`)
    const deletedCategory = await category.deleteOne()
    res.json(`Category '${deletedCategory.Categoryname}' ID '${deletedCategory._id}' deleted`)
}


module.exports = {
    createNewCategory,
    getAllCategorys,
    updateategorys,
    deleteCategory
}