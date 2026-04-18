const express = require('express')
const routes = express.Router()
const multer = require('multer')
const controller = require('../controllers/files.controllers.js')
const handleQuery = require('../controllers/query.controller.js')
const history = require('../controllers/history.controller.js')

const upload =multer({
    dest:"uploads/"
})

routes.post('/fileUpload',upload.single("file"),controller)
routes.post('/query',handleQuery)

routes.get('/history/:sessionId',history)

module.exports= routes
