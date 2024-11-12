const express = require("express")
const basketController = require("../controllers/basketController")
const verifyJWT = require("../middlewares/verifyJWT")
const router=express.Router()

router.use(verifyJWT)
router.post("/", basketController.AddProductToBasket)//פונקציית הוספה לסל קניות עבור משתמש מורשה עם טוקן
router.get("/", basketController.getAllItems)
router.delete("/", basketController.deleteItem)
//router.put("/",verifyJWT, basketController.updateCountOfItems)
module.exports = router

