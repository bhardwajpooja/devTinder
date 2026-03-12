const validator = require('validator')

const validateSignUpData =  (req) => {
    const {emailId, firstName, lastName, password} =  req.body
    if (!firstName || !lastName) {
        throw new Error ('Name is not valid')
    } else if (!validator.isEmail(emailId)) {
        throw new Error ('Email is not valid')
    }else if (!validator.isStrongPassword(password)) {
        throw new Error ('please add strong password')
    }
    return
}

const validateEditProfileData =  (body) => {
    const allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "gender", "age","skills"]
    const isEditAllowed = Object.keys(body).every((field) => allowedEditFields.includes(field))
    if (!isEditAllowed) {
        throw new Error ("Please pass valida input fields")
    }
    return
}

module.exports = {
    validateSignUpData,
    validateEditProfileData
}