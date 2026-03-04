const express =  require('express');
const app =  express()

// to handle request
app.use((req,res) => {
  res.send('Hello from server')
})
app.listen(3000,() => {
    console.log(('app is running on 3000'))
})