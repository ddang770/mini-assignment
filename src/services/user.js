const db = require('../configs/database')

const createNewUser = async (name, email, password) =>{
    const result = await db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password]
    )
    //console.log(result)
    return {
        name,
        email
    }
}

const getAllUser = async () => {
    const result = await db.query(
        'SELECT id, name, email, created_at FROM users'
    )
    return result[0]
}

const getUserById = async (id) => {
    const result = await db.query(
        'SELECT id, name, email, created_at FROM users WHERE id=?', [id]
    )
    if (result[0].length === 0) return null
    return result[0]
}

const updateUserById = async (id, name, email, password) => {
    await db.query(
        'UPDATE users SET name=?, email=?, password=? WHERE id=?', [name, email, password, id]
    )
    return {
        id, name, email
    }
}

const deleteUserById = async (id) => {
    const [result] = await db.query(
        'DELETE FROM users WHERE id=?', [id]
    )
    if (result.affectedRows === 0) throw new Error('User not found')
}

module.exports = {
    createNewUser, getAllUser, getUserById, updateUserById, deleteUserById
}
