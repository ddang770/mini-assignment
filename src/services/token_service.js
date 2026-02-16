const db = require('../configs/database')
const jwt = require('jsonwebtoken')

const saveRefreshToken = async (user_id, token) => {
    await db.query('INSERT INTO refresh_tokens(user_id, token) values (?, ?)', [user_id, token])
}

const deleteRefreshToken = async (token) => {
    const [result] = await db.query('DELETE FROM refresh_tokens where token = ?', [token])
    if (result.affectedRows === 0) throw new Error('Token not found')
}

const findRefreshToken = async (token) => {
    const isToken = await db.query('SELECT user_id from refresh_tokens WHERE token = ?', [token])
    if(isToken[0].length > 0) return true
    return false
}

const verifyRefreshToken = async (token) => {
    try {
        const isTokenInDb = await findRefreshToken(token)
        if(!isTokenInDb) return null
        
        const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        
        const newAccessToken = jwt.sign({
            id: payload.id,
            name: payload.name,
            email: payload.email,
            created_at: payload.created_at
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRES})
        return {
            accessToken: newAccessToken
        }
    } catch (e) {
        if(e.name === 'TokenExpiredError'){
            await deleteRefreshToken(token)
        }
        
        return null
    }
}

module.exports = {saveRefreshToken, deleteRefreshToken, findRefreshToken, verifyRefreshToken}