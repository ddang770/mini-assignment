const userModel = require('../services/user')

const createNewUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const user = await userModel.createNewUser(name, email, password)
        res.status(201).json({
            EM: 'created success',
            EC: 0,
            DT: user
        })
    } catch (error) {
        next(error)
    }
}

const getAllUser = async (req, res, next)=> {
    try {
        const users = await userModel.getAllUser()
        res.status(200).json({
            EM: 'get all success',
            EC: 0,
            DT: users
        })
    } catch (er){
        next(er)
    }
}

const getUserById = async (req, res, next) => {
    try {
        const user = await userModel.getUserById(req.params.id)
        if (user)
            res.status(200).json({
                EM: 'get success',
                EC: 0,
                DT: user
            })
        else res.status(200).json({
                EM: 'User not found',
                EC: 1,
                DT: user
            })
    } catch (er) {
        next(er)
    }
}

const updateUserById = async (req, res, next) => {
    try {
        const {name, email, password} = req.body
        const user = await userModel.updateUserById(req.params.id, name, email, password)
        res.status(200).json({
            EM: 'updated success',
            EC: 0,
            DT: user
        })
    } catch (e) {
        next(e)
    }
}

const deleteUserById = async (req, res, next) => {
    try {
        await userModel.deleteUserById(req.params.id)
        res.status(200).json({
            EM: 'deleted success',
            EC: 0,
            DT: []
        })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    createNewUser, getAllUser, getUserById, updateUserById, deleteUserById
}