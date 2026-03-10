const mongoose =  require('mongoose')

const connectDb =  async () => {
   await  mongoose.connect(
        "mongodb+srv://bhardwajpooja993_db_user:tXNSwSMqGYs6uFb0@cluster0.b00yoc6.mongodb.net/UserInfo"
    )
}

module.exports = connectDb

