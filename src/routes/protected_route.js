const express = require('express')
const router = express.Router()
const jwtAuth = require('../middlewares/jwtAuth')

router.use(jwtAuth.authenticateToken)

router.get('/me', (req, res)=> {
    //const refreshToken = req.cookies.refreshToken
    return res.json({
        EC: 0,
        EM: "ok",
        DT: [req.user]
    })
})

module.exports = router