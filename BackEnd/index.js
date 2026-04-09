const express = require('express')
const multer = require('multer')
const cors = require('cors')
const dotenv= require('dotenv')
dotenv.config()

const PORT = process.env.PORT

const app = express()

app.get("/",(req,res)=>{
    res.status(200).send("working")
    
})

app.listen(PORT,()=>{
    console.log(`Backend is running on port ${PORT}`)
})