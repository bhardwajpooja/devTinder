const mongoose = require('mongoose')

const connectionRequestSchema = mongoose.Schema(
    {
        fromUserId : {
            type : mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "users"
        },
        toUserId : {
            type : mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "users"
        },
        status: {
            type : String,
            enum : {
                values: ["ignore", "interested", "accepted", "rejected"],
                message: `{VALUE} is incorrect status type`
            },
            require: true
        }
    },
    {
        timestamps : true 
    }
)

module.exports = new mongoose.model("connectionRequest", connectionRequestSchema)
