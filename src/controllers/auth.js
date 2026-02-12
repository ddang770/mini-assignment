const loginRegisterService = require('../services/login_register')
const jwtAuth = require('../middlewares/jwtAuth')

const register = async (req, res, next) => {
    try {
        const {name, email, password} = req.body

        const result = await loginRegisterService.register(name, email, password)
        res.status(201).json({
            EM: "registered success",
            EC: 0,
            DT: result
        })
    } catch (e){
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body

        const result = await loginRegisterService.login(email, password)
        
        const accessToken = jwtAuth.generateAccessToken(result)
        //console.log(accessToken)
        res.cookie("jwt", accessToken, {httpOnly: true})
        
        //const refreshToken = await generateRefreshToken(result)
        
        res.status(201).json({
            EM: "login success",
            EC: 0,
            DT: {name: result.name, email: result.email, accessToken}
        })
    } catch (e){
        next(e)
    }
}

module.exports = {register, login}