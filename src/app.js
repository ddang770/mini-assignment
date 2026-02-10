const express = require('express')
const app = express()
require('dotenv').config()
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.get('/', (req, res)=>res.send("Hello world"))
app.use('/users', userRoutes)
app.use('/auth', authRoutes)

app.use((err, req, res, next) => {
    //console.error(err)
    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        EM: err.message,
        EC: -1,
    })
})

app.listen(port, ()=>{
    console.log(`listening on ${port}`)
})