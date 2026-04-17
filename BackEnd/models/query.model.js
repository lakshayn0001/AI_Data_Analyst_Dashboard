const mongoose= require('mongoose')

const query = new mongoose.Schema({
    sessionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Session'
    },
    question:String,
    result:String,
    createdAt:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Query",query)