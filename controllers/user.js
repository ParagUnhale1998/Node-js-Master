const User = require("../models/user")

async function handleGetAllUsers(req,res){
    const allDbUsers =  await User.find({})
    return res.json(allDbUsers)
}

async function handleGetUserById(req, res){
        //Get The User by Id
        const user = await User.findById(req.params.id)
      if(!user){return res.status(404).json({error:"User not Found"})}
      return res.json(user)
    }

async function handlePatchUserById(req, res){
    //Edit User
    const updatedData = req.body;

    const user = await User.findByIdAndUpdate(req.params.id,updatedData)
    if(!user){return res.status(404).json({error:"User not Found"})}
    return res.json({status:"success"})

}

async function handleDeleteUserById(req, res) {
    /// Delete User
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user){return res.status(404).json({error:"User not Found"})}
    return res.json({status:"successfully Deleted"})
}

async function handleCreateNewUser(req, res) {
    //Create New User
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
    return res.status(201).json({msg:"Success",id:result._id})
}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handlePatchUserById,
    handleDeleteUserById,
    handleCreateNewUser
}