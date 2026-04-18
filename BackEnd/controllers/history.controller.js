const Query = require('../models/query.model.js')


const history =async(req,res)=>{
    try{
        const {sessionId}= req.params;
    const history= await Query.find({sessionId})
    res.status(201).json(history)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}


module.exports= history