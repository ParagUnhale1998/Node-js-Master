const express = require('express')
const app = express() 
const PORT = 8000
// this is flow how you work sync code
const {connectMongoDB} = require("./connection")
const {logReqRes} = require("./middlewares/index")
const userRouter = require("./routes/user")

//connection
connectMongoDB('mongodb://localhost:27017/youtube-app-1')

//MiddleWares
app.use(express.urlencoded({ extended: false })) 
app.use(logReqRes("reqLog.txt"))

//Routes
app.use("/api/users",userRouter)

//Server Connect
app.listen(PORT, () => {
    console.log('Server Started At Port:' + PORT)
})
