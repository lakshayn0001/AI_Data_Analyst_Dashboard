const files= require('../models/file.model.js')
const Session= require('../models/session.model.js')
const query= require('../models/query.model.js')
const hasher = require('../utils/hashHelper.utils.js')

const analyzeData= async(req,res)=>{
    try{
        const file=req.file;
        console.log(file)
        console.log(req.body)
        const question= req.body.question;

        if(! question){
            console.log("Please Enter the question")
            return
        }

        const filehash=hasher(file.path);
        let existingFIle = await files.findOne({filehash})

        let session;
        if(existingFIle){
            session= await Session.findOne(
                {
                    fileId: existingFIle._id
                }
            )
        }else{
            const newFile = await files.create({
                filename: file.originalname,
                filepath: file.path,
                filehash
            })

            session= await Session.create({
                fileId: newFile._id
            })
        }
        const result = {
            message:"Processing will happend",
            question
        }

        await query.create({
            sessionId:session._id,
            question,
            result
        });
        res.json({
            sessionId: session._id,
            result
        })
        
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = analyzeData


