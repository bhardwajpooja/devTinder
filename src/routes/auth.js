const express =  require('express');
const authRouter = express.Router();
const {validateSignUpData} =  require('../utils/validator')
const User = require('../model/user')
const bcrypt = require('bcrypt')
const expiryDate = new Date(Date.now() + 8 * 3600000); //  // 8 hour from now

authRouter.post('/signup', async (req, res) => {
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


 authRouter.post('/login', async (req, res) => {
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
            const token =  await user.getJWT() // {expiresIn : 1d} // 1 day
            console.log('token____',token)
            res.cookie('token',token, { expires: expiryDate }) // in production always use res.cookie('token',token,{ expires: expiryDate, httpOnly: true) // alway send expire also in cookie 
            res.send("Login Successfull")
        } else {
           throw new Error ("Invalid Credentials s")
        }
    } catch(e) {
        console.log('exception',e)
        res.status(400).send("ERROR: "+e.message)
    }
 })

 authRouter.post('/logout',async (req, res) => {
    res.cookie('token',null, {expires: new Date(Date.now())})
    res.send('logout successfully')


   // OR res.cookie('token',null, {expires: new Date(Date.now())}).send('logout successfully')
 })



module.exports =  authRouter;