const express =  require('express');
const usersRouter = express.Router();
const ConnectionRequest = require('../model/connectionRequest')
const {userAuth} =  require('../middleware/auth')
const User = require('../model/user')

const USER_SAFE_DATE = ["firstName", "lastName", "emailId", "photoUrl", "about", "skills"]
// received
usersRouter.get('/user/requests/:status', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user
        console.log('loggedInUser',loggedInUser)
        const connectionRequests = await ConnectionRequest.findOne({ 
            toUserId:loggedInUser._id, status: "interested" }).populate("fromUserId", ["firstName", "lastName"]);
        res.json({'message':'data fetched successfully',data:connectionRequests})
    } catch(exception) {
        console.log('exception',exception)
        res.status(400).send("ERROR: "+err.message)
    }
})

usersRouter.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user
        console.log('loggedInUser',loggedInUser)
        // const connectionRequests = await ConnectionRequest.findOne
        // ({ $or : [{},{}], }).populate("fromUserId", ["firstName", "lastName"]);

        const connectionRequests = await ConnectionRequest.findOne
        ({ $or : [{"fromUserId": loggedInUser._id},{"toUserId": loggedInUser._id}] }).populate("fromUserId", USER_SAFE_DATE).populate("toUserId", USER_SAFE_DATE);

        console.log('connectionRequests',connectionRequests)

        // const data = connectionRequests.map((row) => {
        //     if (row.fromUserId._id.toString() == loggedInUser._id.toString()){
        //        return row.toUserId;
        //     }
        //     return row.fromUserId;
        // })

       // console.log('data',data)

        res.json({'message':'data fetched successfully',data:connectionRequests})
    } catch(exception) {
        console.log('exception',exception)
        res.status(400).send("ERROR: "+exception.message)
    }
})

// feed API
usersRouter.get('/feed', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user
      //  console.log('loggedInUser',loggedInUser)
        // const connectionRequests = await ConnectionRequest.findOne
        // ({ $or : [{},{}], }).populate("fromUserId", ["firstName", "lastName"]);

        const connectionRequests = await ConnectionRequest.find({ $or : [{"fromUserId": loggedInUser._id}]});

       // console.log('connectionRequests',connectionRequests)
        // const connectionRequests = await ConnectionRequest.findOne
        // ({ $or : [{"fromUserId": loggedInUser._id},{"toUserId": loggedInUser._id}] }).populate("fromUserId", USER_SAFE_DATE).populate("toUserId", USER_SAFE_DATE);

        const userIdsForFeed = new Set();
        Object.values(connectionRequests).forEach((key) => {
            userIdsForFeed.add(key.toUserId.toString())
        });

       console.log('userIdsForFeed',userIdsForFeed)

        const finalData = await User.find({
            _id: { $in: Array.from(userIdsForFeed) }
          });

        // const data = connectionRequests.map((row) => {
        //     if (row.fromUserId._id.toString() == loggedInUser._id.toString()){
        //        return row.toUserId;
        //     }
        //     return row.fromUserId;
        // })

       console.log('data',finalData)

        res.json({'message':'data fetched successfully', data: finalData})
    } catch(exception) {
        console.log('exception',exception)
        res.status(400).send("ERROR: "+exception.message)
    }
})

module.exports = usersRouter