const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/', (req, res)=>res.send("User show here"))
//router.get('/create', (req, res)=>res.render("../views/users.ejs"))

router.post('/create-user', userController.createNewUser)
// router.post('/create-user', (req, res)=>{
//     console.log(req.body)
//     res.send("post user")
// })

module.exports = router