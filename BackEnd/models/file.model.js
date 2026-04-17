const moongoose= require('mongoose')

const Schema = new moongoose.Schema({
    filename:{
        type:String,
        require:true
    },
    filepath:{
        type:String,
        require:true
    },
    filehash:String,
    createdAt:{
        type:Date,
        default: Date.now
    }
}
)

module.exports = moongoose.model("File",Schema)
