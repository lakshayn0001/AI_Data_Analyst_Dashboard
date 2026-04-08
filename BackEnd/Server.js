const express = require('express')
const multer = require('multer')
const cors = require('cors')
const PORT= 8000


const app = express()

app.get("/",(req,res)=>{
    console.log("working")
    
})

app.listen(PORT,()=>{
    console.log(`Backend is running on port ${PORT}`)
})