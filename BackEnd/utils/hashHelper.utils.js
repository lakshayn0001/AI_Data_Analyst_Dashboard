const crypto= require('crypto')
const fs = require('fs')


const generateHashFile= (filePath)=>{
    const fileBuffer= fs.readFileSync(filePath)
    return crypto.createHash('m5').update(fileBuffer).digest("hex")
}

module.exports = generateHashFile
