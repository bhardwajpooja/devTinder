const express =  require('express');
const app =  express();
const {userAuth,adminAuth} = require('./middleware/auth')
const connectDb = require('./config/database')
const User =  require('./model/user')
// to handle request

// app.use('/hello',(req,res) => {
//     res.send('Hello from server')
// })

// app.use('/hello/2',(req,res) => {
//     res.send('Hello 2 from server')
// })

// app.use('/namaste',(req,res) => {
//     res.send('namaste from server')
// })

// app.use('/', (req,res) => {
//     res.send('server give response')
//   })

// app.get("/user/:userId/:name/:password", (req, res) => {
//     res.send({firstname: "Pooja", lastName:"devi"})
// })

connectDb().then( () => {
    console.log('Database connected successfully')// when database is connected then start your app
    app.listen(3000,(req, res) => {
        console.log("app is running on 3000")
    })
}).catch((error) => {
    console.error('error in connecting database',error)
})

app.use(express.json()) // important one for req.nody post
app.get('/user/login', userAuth, (req, res) => {
   res.send('user data sent')
})

app.post('/signup', async (req, res) => {
    try {
        // const user =  new User ({
        //     "firstName": "pooja",
        //     "lastName": "bhard",
        //     "emailId": "test@123",
        //     "password": r"!343434
        // })
        const user =  new User(req.body)
        const response = await user.save();
        console.log('response',response)
        res.send({error:false, msg: 'user added successfully'})
    } catch(exception) {
        console.log('exception',exception)
        res.send({error: true, msg: exception})
    }
 })
 
 // feed API -> get all the users from database
 app.get('/users', async (req, res) => {

 });

// get user by email id or // get user by id
 app.get('/user', async (req, res) => {
    try {
        const userEmail = req.body.emailId
        const result = await User.find({emailId: userEmail})
        res.send(result)
    } catch(exception) {
        res.send({error: true, msg:exception})
    }
 })

// delete users 
 app.delete("/user", async (req, res) => {
    try {
        const userId =  req.body.userId
        // const result = await User.findByIdAndDelete({_id:userEmail})  //or below is short hand for this
         const result = await User.findByIdAndDelete(userId)
         res.send(result)
    } catch(exception) {
        res.send({error: true, msg:exception})
    }
 });

 // update user data


 app.patch("/user", async (req, res) => {
    try {
        const userId =  req.body.userId
        const bodyParams =  req.body;
        const result =  await User.findByIdAndUpdate(userId, bodyParams, {returnDocument: "before"})
        // const result =  await User.findByIdAndUpdate({_id: userId}, bodyParams, {returnDocument: "before"})
        res.send(result)
    } catch(exception) {
        res.send({error: true, msg:exception})
    }
 })


