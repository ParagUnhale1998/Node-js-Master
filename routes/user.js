const express = require('express')
const router = express.Router()
const { handleGetAllUsers, handleGetUserById, handlePatchUserById, handleDeleteUserById, handleCreateNewUser } = require("../controllers/user")

//For CRUD REquest Check Controller folder
//REST API POINTS

router.route("/")
    .get(handleGetAllUsers)
    .post(handleCreateNewUser)

router.route('/:id')
    .get(handleGetUserById)
    .patch(handlePatchUserById)
    .delete(handleDeleteUserById)

module.exports = router

/*
old code without using controller folder

router.get("/",async (req,res) => {
    const allDbUsers =  await User.find({})
    return res.json(allDbUsers)
})

router.route('/:id') 
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


router.post('/', async (req, res) => {
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
})*/