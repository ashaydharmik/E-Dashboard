const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express();

app.use(cors())


app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use("/", require("./routes/userRoute"))


//mongodb connection
app.listen(process.env.PORT, ()=>{
    mongoose.connect(process.env.MONGODB_CONNECT)
    .then(()=> console.log(`mongodb connected and server is running at port ${process.env.PORT}`))
    .catch((error)=> console.log(error))
})