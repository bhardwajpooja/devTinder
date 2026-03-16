const express =  require('express');
const requestRouter = express.Router();
const {userAuth} =  require('../middleware/auth')
const ConnectionRequest = require('../model/connectionRequest')
const User = require('../model/user')

requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
    try {
        const user  =  req.user
        console.log('req__params',req.params)
        const fromUserId = user._id
        const toUserId  =  req.params.toUserId
        const status    = req.params.status

        const AllowdStatus = ["ignored","interested"]
        if (!AllowdStatus.includes(status)) {
            return res.send(400).json({message: 'Invalid Status type'+status})
        }


        const toUserExists =  User.findById(toUserId)
        if(!toUserExists) {
            return res.send(400).json({message: 'to user does not exist'})
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or : [
                { fromUserId, toUserId },
                { fromUserId : toUserId, toUserId :fromUserId}
            ]
        })
        
        if (existingConnectionRequest) {
            //console.log('existingConnectionRequest',existingConnectionRequest)
            return res.status(400).json({
                message: 'Connection Already exists',
                data: {}
            })
        }
        
        // dave connection request
        const connectionRequest =  new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const data =  await connectionRequest.save();
    
        res.status(200).json({
            message: 'Connection Request saved successfully',
            data: data
        })
        return
    } catch(err) {
        console.log('err',err)
        res.status(400).send("ERROR: "+err.message)
    }
})


module.exports =  requestRouter;