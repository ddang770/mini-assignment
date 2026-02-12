const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const inputValidation = require('../middlewares/inputValidation')
const jwtAuth = require('../middlewares/jwtAuth')

router.get('/me', jwtAuth.authenticateToken, (req, res)=> {
    return res.json({
        EC: 0,
        EM: "ok",
        DT: req.user
    })
})
router.post('/register',inputValidation.validateRegister, authController.register)
router.post('/login',inputValidation.validateLogin, authController.login)

module.exports = router