const asyncHandler = require("../Middleware/asyncHandler")
const Products = require("../Models/productsModel")
const mongoose = require("mongoose")

const addProducts = asyncHandler(async(req,res)=>{

    const {productName, price, category, companyName, userId} = req.body

    if(!productName || !price || !category || !companyName || !userId){
        res.status(400)
        throw new Error("Please enter all the fields")
    }

    const availableProduct = await Products.findOne({productName})
    if(availableProduct){
        res.status(400)
        throw new Error("Product already exists")
    }
    const product = await Products.create({
        productName,
        price,
        category,
        companyName, 
        userId
    })

    if(product){
        res.status(201).json({message:"Product successfully created", productName,price,category,companyName })
    }else{
        res.status(400)
        throw new Error("Invalid user data")
    }
})

const getAllProducts = asyncHandler(async (req, res) => {
    const getProducts = await Products.find();
  
    if (getProducts.length > 0) {
      res.status(200).json({ products: getProducts });
    } else {
      res.status(400);
      throw new Error('No products Found');
    }
  });

const deleteProducts = asyncHandler(async(req,res)=>{
    const { _id, productName } = req.query;

    if (!_id) {
      res
        .status(400)
        .json({ error: "Invalid request. Missing created product ID." });
      return;
    }
  
    const deletedProduct = await Products.findByIdAndDelete(_id);
  
    if (!deletedProduct) {
      res.status(404).json({ error: "Created product not found." });
    } else {
      res.status(200).json({ message: "product Successfully Deleted!!", productName: deletedProduct.productName });
    }
})


const updateProducts = asyncHandler(async(req,res)=>{
    const { productName,
        price,
        category,
        companyName} = req.body
        const {_id} = req.params;

        const availableProduct = await Products.findOne({ _id})
        if(!availableProduct){
            res.status(400)
            throw new Error("Product not exists")
        }

    const update = await Products.findByIdAndUpdate(_id,{
        productName,
        price,
        category,
        companyName,
    },
    {new:true}
    )
    if(update){
        res.status(200).json({message:"Product Updated Successfully", updatedProduct : update})
    }else{
        res.status(400)
        throw new Error("Invalid Data")
    }
    

})

const singleProduct = asyncHandler(async(req,res)=>{
    const {_id} = req.params;
    const availableProduct = await Products.findOne({ _id})
        if(!availableProduct){
            res.status(400)
            throw new Error("Product not exists")
        }else{
            res.status(200).json({message:"Product Found", availableProduct})
        }
})

const searchProduct = asyncHandler(async(req,res)=>{
        const products = await Products.find({
            "$or":[
                { productName: { $regex: req.params.key, $options: 'i' } },
                { price: { $regex: req.params.key, $options: 'i' } },
                { category: { $regex: req.params.key, $options: 'i' } },
                { companyName: { $regex: req.params.key, $options: 'i' } }
            ]
        })
        if(products){
            res.status(200).json({products})
        }else{
            res.status(400)
            throw new Error("Product not Found")
        }
})

module.exports = {addProducts, getAllProducts, deleteProducts, updateProducts, singleProduct, searchProduct}