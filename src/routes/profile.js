const express =  require('express');
const profileRouter = express.Router();
const {userAuth} =  require('../middleware/auth')
const {validateEditProfileData} =  require('../utils/validator')

 // get Profile
 profileRouter.get('/profile/view', userAuth, async (req, res) => {
    try {
        const user =  req.user;
        res.send(user)
    } catch(err) {
        res.status(400).send("ERROR: "+err.message)
    }
})


profileRouter.get('/profile/edit', userAuth, async (req, res) => {
    try {
        validateEditProfileData(req.body)
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key])
        const result =  await loggedInUser.save();
        res.json({message: `${loggedInUser.firstName} your profile has beed updated successfully`,data: result})
    } catch(err) {
        res.status(400).send("ERROR: "+err.message)
    }
})

// forget passwor API
profileRouter.patch('/profile/password', async (req, res) => {
    try{
        // whethee user is logged in or loggout it
        // take password , save in database after validating pasword
    } catch(exception) {
        console.log('exception',exception)
        res.status(400).send("ERROR: "+err.message)
    }
})

module.exports = profileRouter