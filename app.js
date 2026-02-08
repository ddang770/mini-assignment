const express = require('express')
const app = express()
const userRoutes = require('./routes/user')
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use('/users', userRoutes)

app.get('/', (req, res)=>res.send("Hello world"))

app.listen(port, ()=>{
    console.log(`listening on ${port}`)
})