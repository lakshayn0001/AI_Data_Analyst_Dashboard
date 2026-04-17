const express = require('express')
const routes = express.Router()
const multer = require('multer')
const controller = require('../controllers/files.controllers.js')

const upload =multer({
    dest:"uploads/"
})

routes.post('/fileUpload',upload.single("file"),controller)


module.exports= routes
