const express = require('express')
const app = express()
require('dotenv').config()
const userRoutes = require('./routes/user')
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.get('/', (req, res)=>res.send("Hello world"))
app.use('/users', userRoutes)

app.use((err, req, res, next) => {
    console.error(err) // log để debug

    res.status(500).json({
        EM: err.message,
        EC: 1,
        DT: []
    })
})

app.listen(port, ()=>{
    console.log(`listening on ${port}`)
})