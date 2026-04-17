const mongoose= require('mongoose')

const session = new mongoose.Schema({
    fileId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'File'
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

module.exports= mongoose.model("Session",session)