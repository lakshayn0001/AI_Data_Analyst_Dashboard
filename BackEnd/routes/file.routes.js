const express = require('express')
const routes = require(express.Router())
const multer = require('multer')
const controller = require('../controllers/files.controllers.js')

const upload =multer({
    dest:"uploads/"
})

routes.post('/',upload.any(),controller)


module.exports= routes
