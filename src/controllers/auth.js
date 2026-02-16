const loginRegisterService = require('../services/login_register')
const tokenService = require('../services/token_service')
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
        if(req.cookies.refreshToken) return res.status(200).json({
            EM: "Already logged in!",
            EC: 0
        })
        const {email, password} = req.body

        const result = await loginRegisterService.login(email, password)
        
        const refreshToken = jwtAuth.generateRefreshToken(result)
        const accessToken = jwtAuth.generateAccessToken(result)

        //save refresh to db
        await tokenService.saveRefreshToken(result.id, refreshToken)

        res.cookie("refreshToken", refreshToken, {httpOnly: true, sameSite: "strict"})
        //res.cookie("accessToken", accessToken, {httpOnly: true})
        
        return res.status(200).json({
            EM: "login success",
            EC: 0,
            DT: {name: result.name, email: result.email, accessToken}
        })
    } catch (e){
        next(e)
    }
}

const generateNewAccessToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) return res.sendStatus(401)
        
        const result = await tokenService.verifyRefreshToken(refreshToken)
        if(!result) return res.sendStatus(403)
        
        return res.json({
            EC: 0,
            EM: "Refresh access token success",
            DT: result
        })
    } catch (e) {
        next(e)
    }
}

const logout = async (req, res, next) => {
    try {
        if (!req.cookies.refreshToken) {
            return res.status(200).json({ EC: 0, EM: "Already logged out" })
        }
        await tokenService.deleteRefreshToken(req.cookies.refreshToken)
        res.clearCookie("refreshToken")
        return res.status(200).json({
            EC: 0,
            EM: "Logout success!"
        })
    } catch (e) {
        next(e)
    }
}

module.exports = {register, login, generateNewAccessToken, logout}