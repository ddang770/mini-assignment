const loginRegisterService = require('../services/login_register')

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


module.exports = {register}