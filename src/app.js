const express =  require('express');
const app =  express();
const {userAuth,adminAuth} = require('./middleware/auth')
const connectDb = require('./config/database')
const User =  require('./model/user')
const {validateSignUpData} =  require('./utils/validator')
const bcrypt = require('bcrypt')
const cookieParser =  require("cookie-parser")
const jwt =  require("jsonwebtoken")
const scretKey = 'devProject@345'
const expiryDate = new Date(Date.now() + 8 * 3600000); //  // 8 hour from now

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
app.use(cookieParser())


app.get('/user/login', userAuth, (req, res) => {
   res.send('user data sent')
})

app.post('/signup', async (req, res) => {
    try {
        validateSignUpData(req)
        const {firstName, lastName, emailId, password} = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10)
        const user =  new User({
            firstName,
            lastName,
            emailId,
            password: encryptedPassword
        })
        const response = await user.save();
        res.send({error:false, msg: 'user added successfully'})
    } catch(exception) {
        console.log('exception',exception)
        res.send({error: true, msg: exception})
    }
 })


 app.post('/login', async (req, res) => {
    try {
        const {emailId, password}  = req.body
        const user = await User.findOne({emailId})
        if (!user) {
           throw new Error ("Invalid credentials")
        }
        const isPasswordValid =  await bcrypt.compare(password, user.password)
        if (isPasswordValid) {
            // create s JWT token
            // const token =  jwt.sign({_id: user._id}, scretKey,{expiresIn:"7d"}) // {expiresIn : 1d} // 1 day
            // console.log('user',user.getJWT())
            const token =  user.getJWT() // {expiresIn : 1d} // 1 day
            res.cookie('token',token, { expires: expiryDate }) // in production always use res.cookie('token',token,{ expires: expiryDate, httpOnly: true) // alway send expire also in cookie 
            res.send("Login Successfull")
        } else {
           throw new Error ("Invalid Credentials s")
        }
    } catch(e) {
        res.status(400).send("ERROR: "+e.message)
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
 app.patch("/user/:userId", async (req, res) => {
    try {
        const userId =  req.params.userId
        const bodyParams =  req.body;
        const result =  await User.findByIdAndUpdate(userId, bodyParams, {returnDocument: "before"})
        // const result =  await User.findByIdAndUpdate({_id: userId}, bodyParams, {returnDocument: "before"})
        res.send(result)
    } catch(exception) {
        res.send({error: true, msg:exception})
    }
 })

 // get Profile
 app.get('/profile', userAuth, async (req, res) => {
    try {
        const user =  req.user;
        res.send(user)
    } catch(err) {
        res.status(400).send("ERROR: "+err.message)
    }
 })

 // sendconnection request
app.post('/sendConnectionRequest', userAuth, async (req, res) => { 
    console.log('sending a connection request');
    const user = req.user;

    res.send(user.firstName +' sent connection request successfully')
 })


