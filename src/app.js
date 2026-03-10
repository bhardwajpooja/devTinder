const express =  require('express');
const app =  express();
const {userAuth,adminAuth} = require('./middleware/auth')

// to handle request

// app.use('/hello',(req,res) => {
//     res.send('Hello from server')
// })

// app.use('/hello/2',(req,res) => {
//     res.send('Hello 2 from server')
// })

// app.use('/namaste',(req,res) => {
//     res.send('namaste from server')
// })

// app.use('/', (req,res) => {
//     res.send('server give response')
//   })

// app.get("/user/:userId/:name/:password", (req, res) => {
//     res.send({firstname: "Pooja", lastName:"devi"})
// })

app.get('/user/login', userAuth, (req, res) => {
   res.send('user data sent')
})

app.get('/user/data', userAuth, (req, res) => {
    res.send('user data sent')
 })

 app.get('/admin/getAllData', adminAuth, (req, res) => {
    res.send('user data sent')
 })

app.listen(3000,(req, res) => {
    console.log("app is running on 3000")
})
