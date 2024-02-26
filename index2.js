const http = require('http')
const fs = require('fs')

//create server uwithout using express

const myserver = http.createServer((req,res) => {  // always use async task like non-blocking tasks
// console.log('new server request')
// console.log(req)
const ipAddress = req.socket.remoteAddress;

const dateTime = new Date().toISOString();

const log = `${dateTime}: IP Address ${ipAddress} ,${req.url} = made a request\n`;

fs.appendFile('log.txt',log,(err) => {
    if (err) {
        console.error('Error appending to log file:', err);
    }
    switch(req.url){ //for route url
        case '/':res.end('Home page')
        break
        case '/about':res.end('I am Parag unhale')
        break;
        case '/singup': // all route http req like get,post,patch,put,delete
            if(req.method==='GET') {
                res.end('this is a signup form')
            }
            else if(req.method === 'POST'){
            //db quary
            res.end("success")
            }
        default:res.end('404')

    }
})

})

myserver.listen(8000,() => {
    console.log('server has started at 3000')
})