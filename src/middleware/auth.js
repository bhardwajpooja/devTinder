const jwt =  require("jsonwebtoken")
const scretKey = 'devProject@345'
const User = require('../model/user')

const userAuth = async (req, res, next) => {
    try {
        const cookies =  req.cookies
        const { token } = cookies
        console.log('token',token)
        if (!token) {
            throw new Error ("Invalid token")
        }
        const decodedMessage =  await jwt.verify(token, scretKey)
        const { _id } = decodedMessage
        console.log("Logged in User is:",_id)
        const user = await User.findById({_id:_id})
        if (!user) {
            throw new Error ("User doesn't exist")
        }
        req.user = user
        next();
    } catch(err) {
        console.log('err',err)
        res.send('Authentication Error : ==', err)
    }
}

const adminAuth = (req, res, next) => {
    next();
}

module.exports = {
    userAuth,
    adminAuth
}