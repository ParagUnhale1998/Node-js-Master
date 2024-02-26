const express = require('express')
// const users = require('./MOCK_DATA.json')
const app = express() //handler function
const PORT = 8000
const fs = require('fs')
const mongoose = require("mongoose")


//connection
mongoose.connect('mongodb://localhost:27017/youtube-app-1')
    .then(() => console.log('mongoDb Connected')).catch((err) => console.log(err))


const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,

    },
    job_title: {
        type: String,

    }
},{timestamps:true})

const User = mongoose.model('user', userSchema) // interface model  and user is collection Name automatic users added


app.use(express.urlencoded({ extended: false })) // for get the data from postmon or html as urlencoded and add the data to body in post
//Routes

app.get('/users',async (req, res) => {
    const allDbUsers =  await User.find({})
    const html = `
    
    <h1>Welcome to Rest Api</h1>
    <ul>
    ${allDbUsers.map((user) => `<li>${user.first_name} + ${user.email}</li>`).join("")}
    `
    res.send(html)
})

//REST API POINTS
app.get('/api/users',async (req, res) => {
    //Get All  Users
    const allDbUsers =  await User.find({})
   res.setHeader("X-MyName","parag unhale") // customer header
    return res.json(allDbUsers)
})

app.route('/api/users/:id')
    .get(async(req, res) => {
        //Get The User by Id
        const user = await User.findById(req.params.id)
      if(!user){return res.status(404).json({error:"User not Found"})}
      return res.json(user)
    })
    .patch(async(req, res) => {
        //Edit User
        const user = await User.findByIdAndUpdate(req.params.id,{last_name:"Changed" })
        if(!user){return res.status(404).json({error:"User not Found"})}
        return res.json({status:"success"})

    })
    .delete(async(req, res) => {
        /// Delete User
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){return res.status(404).json({error:"User not Found"})}
        return res.json({status:"successfully Deleted"})
    })


app.post('/api/users', async (req, res) => {
    //Create New User
    // use middleware to Transform the data 
    const body = req.body;
    if (!body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(404).json({ msg: "all fields are Required! " })
    }

    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    })
  
    console.log(result)
    return res.status(201).json({msg:"Success"})
})

app.listen(PORT, () => {
    console.log('Server Started At ' + PORT)
})
