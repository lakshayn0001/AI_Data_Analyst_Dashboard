const express= require('express')
const app = express()
const dotenv= require('dotenv')
const DB_Connection= require('./config/connection.config.js')
const routes = require('./routes/file.routes.js')
dotenv.config()
app.use(express.json())
DB_Connection()

const port = process.env.PORT

app.use("/api/file",routes)

app.listen(port,()=>{
    console.log("http://localhost:8000/")
})