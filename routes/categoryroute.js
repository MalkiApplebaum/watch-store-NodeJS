const express = require("express")
const categoryController = require("../controllers/categoryController")
const router=express.Router()

router.post("/", categoryController.createNewCategory)
router.get("/", categoryController.getAllCategorys)
router.put("/", categoryController.updateategorys)
router.delete("/", categoryController.deleteCategory)

module.exports = router

