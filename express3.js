const http = require('http')
const express = require('express')

const app = express() //handler function

app.get('/',(req,res) => {
    res.end('hellow from home Page')
})

app.get('/about',(req,res) => {
    res.end('Welcome to about Page ' + 'hey ' + req.query.name) //name is your parameteer or category
})


app.listen(8000,() => {
        console.log('server has started at 8000')
    })
    
    // this is old http without using express
// const myserver = http.createServer(app)
// myserver.listen(8000,() => {
//     console.log('server has started at 8000')
// })
