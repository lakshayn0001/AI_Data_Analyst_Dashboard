const mongoose= require('mongoose')
const dotenv= require('dotenv')

dotenv.config()
const connection = async()=>{
    try{
        const connection=await mongoose.connect(process.env.MONGOOSEDBURL)
        if(connection){
            function databaseHealth(){
                const conn= mongoose.connection;
                return {
                    readyState: conn.readyState,                    // 0-3
                    stateText: mongoose.STATES[conn.readyState],
                    dbName: conn.name,
                    host: conn.host,
                    port: conn.port,
                    hasOpened: conn._hasOpened,
                    lastHeartbeat: conn._lastHeartbeatAt,
                    modelsCount: Object.keys(mongoose.models).length,
                    connectionId: conn.id,
                    replica: conn.replica
                }
            }
            console.log(databaseHealth())
        }
        console.log("DB connected")
    }catch(error){
        console.log("Failed to connect DB : ",error)
        process.exit(1)
    }
}

module.exports= connection