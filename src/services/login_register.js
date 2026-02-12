const db = require('../configs/database')
const bcrypt = require("bcryptjs")
const AppError = require('../errors/AppError')
const createNewUser = require('./user').createNewUser

const register = async (name, email, password) => {
    const isExisted = await db.query('SELECT id FROM users WHERE email=?', [email])
    // console.log(result[0])
    if (isExisted[0].length > 0){
        throw new AppError("Email already exists", 409)
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await createNewUser(name, email, hashedPassword)
    return {
        name, email
    }
}

const login = async (email, password) => {
    const isExisted = await db.query('SELECT id, name, email, password, created_at FROM users WHERE email=?', [email])
    if (isExisted[0].length === 0){
        throw new AppError("Email not found", 401) //Unauthorized
    }
    const user = isExisted[0][0]
    if(await bcrypt.compare(password, user.password)){
        return {
            id: user.id, 
            name: user.name, 
            email, 
            created_at: user.created_at
        }
    } else {
        throw new AppError("Your email or password is incorrect!", 409)
    }
}

module.exports = {register, login}