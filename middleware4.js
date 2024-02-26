const express = require('express')
const users = require('./MOCK_DATA.json')
const app = express() //handler function
const PORT = 8000
const fs = require('fs')

//middlewares - pligins
app.use(express.urlencoded({ extended: false })) // for get the data from postmon or html as urlencoded and add the data to body in post
// next => 
app.use((req,res,next) => {
 console.log("hello from middleware 1") // if i not end this functio server has loadind and not load data 
//  return res.json({msg:"hello from middleware 1"}) // this is good but
req.myUserName = "parag Unahle"
 next() // this is for run all next code 
}) 
//next => 
app.use((req,res,next) => {
    console.log(req.myUserName)
    next()
})
//Routes

app.get('/users', (req, res) => {
    const html = `
    
    <h1>Welcome to Rest Api</h1>
    <ul>
    ${users.map((user) => `<li>${user.first_name}`).join("")}
    `
    res.send(html)
})

//REST API POINTS
app.get('/api/users', (req, res) => {
    //Get All  Users
    return res.json(users)
})

app.route('/api/users/:id')
    .get((req, res) => {
        //Get The User by Id
        const id = Number(req.params.id) //by default its string
        const user = users.find((user) => user.id === id)
        return res.json(user)
    })
    .patch((req, res) => {
        //Edit User
        const id = Number(req.params.id);
        const index = users.findIndex((user) => user.id === id);
        if (index !== -1) {
          users[index] = { ...users[index], ...req.body };
            // const updatedUsers = users.map((user) => {
            //     if (user.id === id) {
            //         return { ...user, ...updatedUserData };
            //     }
            //     return user;
            // });

            fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
                
                if (err) {
                    console.error('Error updating user:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                return res.json({ status: 'Success', updatedUser: users[index] });
            });
        } else {
            return res.status(404).json({ error: 'User not found' });

        }
    })
    .delete((req, res) => {
        /// Delete User
        const id = Number(req.params.id);
        const index = users.findIndex((user) => user.id === id);
        if (index !== -1) {
            users.splice(index, 1);
            fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
                if (err) {
                    console.error('Error deleting user:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                return res.json({ status: 'Success' });
            });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    })


app.post('/api/users', (req, res) => {
    //Create New User
    // use middleware to Transform the data 
    const body = req.body;
    users.push({ ...body, id: users.length + 1 })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        // console.log('User Add ' + data)
        return res.json({ status: "Success", id: users.length })
    })
    // users.push({
    //     first_name: body.first_name,
    //     last_name: body.last_name,
    //     email: body.email,
    //     gender: body.gender,
    //     job_title: body.job_title
    // })
})


// app.get('/api/users/:id', (req, res) => {
//     //Get The User by Id
//     const id = Number(req.params.id) //by default its string
//     const user = users.find((user) => user.id === id)
//     return res.json(user)
// })

// app.post('/api/users', (req, res) => {
//     //Create New User
//     res.json({ status: "pending" })
// })

// app.patch('/api/users/:id', (req, res) => {
//     //Edit User
//     res.json({ status: "pending" })
// })

// app.delete('/api/users/:id', (req, res) => {
//     //Delete User
//     res.json({ status: "pending" })
// })





app.listen(PORT, () => {
    console.log('Server Started At ' + PORT)
})
