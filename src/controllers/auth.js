const loginRegisterService = require('../services/login_register')

const register = async (req, res, next) => {
    try {
        const {name, email, password} = req.body

        const validators = [
            { condition: !name || !name.trim(), message: "Please enter username" },
            { condition: !email, message: "Please enter email" },
            { condition: !validEmailFormat(email), message: "Invalid email" },
            { condition: !password, message: "Please enter password" },
            { condition: password && password.length < 6, message: "Password must be 6 length or more" }
        ];
        for (const v of validators) {
            if (v.condition) {
                return res.status(400).json({
                    EM: v.message,
                    EC: 1
                });
            }
        }

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


const validEmailFormat = (email) => {
    // A simple, common regex pattern for basic email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // The test() method returns true if the email matches the pattern, false otherwise
    return emailPattern.test(email);
}



module.exports = {register}