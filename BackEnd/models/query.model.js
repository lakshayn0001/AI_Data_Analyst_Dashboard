const mongoose= require('mongoose')

const query = new mongoose.Schema({
    sessionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Session'
    },
    question:{
        type:String,
        required: true
    },
    result:Object,
    createdAt:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Query",query)