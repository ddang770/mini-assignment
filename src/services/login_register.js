const db = require('../configs/database')
const bcrypt = require("bcryptjs")
const AppError = require('../errors/AppError')
const createNewUser = require('./user').createNewUser

const salt = bcrypt.genSaltSync(5)

const register = async (name, email, password) => {
    const isExisted = await db.query('SELECT id FROM users WHERE email=?', [email])
    // console.log(result[0])
    if (isExisted[0].length === 1){
        throw new AppError("Email already exists", 409)
    }
    const hashedPassword = bcrypt.hashSync(password, salt)
    await createNewUser(name, email, hashedPassword)
    return {
        name, email
    }
}

module.exports = {register}