const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: [true, "Please enter product name"],
        unique: [true, "Product already exists"]
    },
    price:{
        type: String,
        required: [true, "Please enter product price"],
    },
    category:{
        type: String,
        required: [true, "Please enter category of product"]
    },
    companyName:{
        type: String,
        required: [true, "Please enter Company name "]
    },
    userId:{
        type: String,
        required: [true, "Please enter category of product"]
    },
},
{
    timestamps: true
}
)
module.exports = mongoose.model("Products", productsSchema)