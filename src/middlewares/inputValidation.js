const sendError = (res, message) => {
  return res.status(400).json({
    EM: message,
    EC: 1
  });
};

const validateRegister = (req, res, next) => {
    try{
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
                return sendError(res, v.message)
            }
        }
        next()
    } catch (e){
        next(e)
    }
    
};

const validateLogin = (req, res, next) => {
    try{
        const {email, password} = req.body

        const validators = [
            { condition: !email, message: "Please enter email" },
            { condition: !validEmailFormat(email), message: "Invalid email" },
            { condition: !password, message: "Please enter password" }
        ];
        for (const v of validators) {
            if (v.condition) {
                return sendError(res, v.message)
            }
        }
        next()
    } catch (e){
        next(e)
    }
    
};

const validEmailFormat = (email) => {
    // A simple, common regex pattern for basic email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // The test() method returns true if the email matches the pattern, false otherwise
    return emailPattern.test(email);
}

module.exports = {validateRegister, validateLogin}