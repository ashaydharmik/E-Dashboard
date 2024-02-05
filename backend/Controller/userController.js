const asyncHandler = require("../Middleware/asyncHandler")
const User = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



//user registration
const registerUser = asyncHandler(async(req,res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400)
        throw new Error("Please enter all the fields")
    }

    
    const availableUser = await User.findOne({email})
    if(availableUser){
        res.status(400).json({message: "Email address already exists!!"})
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        password : hashedPassword
    })



    if(user){
        const token = jwt.sign({email: user.email},process.env.ACCESS_KEY,{expiresIn:"5min"})
        res.status(201).json({message:"User successfully created", _id: user.id, name: user.username, email: user.email, token})
    }else{
        res.status(400)
        throw new Error("Invalid user data")
    }
    
})


//user login
const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error("Please enter all the fields")
    }

    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign({
            user:{
                id: user.id,
                email: user.email,
                password: user.password
            }
        },process.env.ACCESS_KEY,{expiresIn:"5min"})
        res.status(201).json({message:"User Successfully logIn",token, name:user.username, id:user.id})
        
    }else{
        res.status(400)
        throw new Error("Invalid email and password")
    }
})




module.exports = { registerUser, loginUser}