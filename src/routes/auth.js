const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const inputValidation = require('../middlewares/inputValidation')

router.post('/register',inputValidation.validateRegister, authController.register)
router.post('/login',inputValidation.validateLogin, authController.login)

router.post('/refresh', authController.generateNewAccessToken)
router.post('/logout', authController.logout)

module.exports = router