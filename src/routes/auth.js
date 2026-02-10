const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

router.get('/me', (req, res)=> res.send("GET /auth/me"))
router.post('/register', authController.register)

module.exports = router