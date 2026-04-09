const moongoose= require('mongoose')

const Schema = moongoose.Schema({
    file:{
        type:String,
        require:true
    },
    input:{
        type:String,
        require:true
    }
},
{
    timestamps:{
        require:true
    }
}
)

const FileModel = moongoose.model("File",Schema)
export default FileModel