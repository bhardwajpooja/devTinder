const express =  require('express');
const connectionRequestRouter = express.Router();
const {userAuth} =  require('../middleware/auth')

 // sendconnection request
 connectionRequestRouter.post('/sendConnectionRequest', userAuth, async (req, res) => { 
    console.log('sending a connection request');
    const user = req.user;
    res.send(user.firstName +' sent connection request successfully')
})


module.exports = connectionRequestRouter