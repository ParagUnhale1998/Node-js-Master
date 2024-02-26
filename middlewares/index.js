const fs = require('fs')


function logReqRes(filename){

return (req,res,next) => {
fs.appendFile(
    filename,
    `\n${Date.now()}:${req.ip}:${req.methods}:${req.path}\n`,
    (req,res) => {
        next()
    }
)
}
}

module.exports = {
    logReqRes,
}