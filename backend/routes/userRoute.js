const express = require("express");
const { registerUser, loginUser} = require("../Controller/userController");
const errorHandler = require("../Middleware/errorHandler");
const { addProducts, getAllProducts, deleteProducts, updateProducts, singleProduct, searchProduct } = require("../Controller/productsController");
const token = require("../Middleware/validateToken")
const router = express.Router();


router.post("/register", registerUser)
router.post("/login", loginUser)

router.post("/addProducts",token, addProducts)
router.get("/allProducts",token, getAllProducts)
router.delete("/deleteProducts",token, deleteProducts)
router.put("/updateProducts/:_id", updateProducts)
router.get("/singleProduct/:_id",token, singleProduct)

router.get("/searchProduct/:key",token, searchProduct)
//error handler middleware
router.use(errorHandler)

module.exports = router;