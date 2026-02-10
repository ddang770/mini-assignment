const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const inputValidation = require('../middlewares/inputValidation')

router.get('/me', (req, res)=> res.send("GET /auth/me"))
router.post('/register',inputValidation.validateRegister, authController.register)

module.exports = router