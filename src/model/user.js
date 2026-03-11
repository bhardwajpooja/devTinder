const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        firstName : {
            type : String,
            required: true,
            minLength: 4,
            maxLength: 50
        },
        lastName : {
            type : String
        },
        emailId : {
            type : String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password : {
            type : String,
            required: true
        },
        age : {
            type : Number,
            min: 18

        },
        gender : {
            type : String,
            validate (value) {
                if(!(["male","female","others"].indexOf(value) > -1)){
                    throw new Error("Gender is not valid");
                }
            } 
        },
        photoUrl: {
            type: String,
            default: "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
        },
        about: {
            type: String,
            default: "This is default about of user"
        },
        skills : {
            type: [String]
        } 
    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model("users", userSchema)
