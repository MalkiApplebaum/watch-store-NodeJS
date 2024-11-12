const express = require("express")
const ProductController = require("../controllers/productController")
const router=express.Router()

router.post("/", ProductController.createNewProduct)
router.get("/", ProductController.getAllProducts)
router.put("/", ProductController.updateProduct)
router.delete("/", ProductController.deleteProduct)

module.exports = router


