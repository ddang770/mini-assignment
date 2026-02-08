const userModel = require('../models/user')

const createNewUser = async (req, res) => {
    let name = req.body.username
    let email = req.body.email
    let password = req.body.password

    let result = await userModel.createNewUser(name, email, password)
    //console.log(result)
    if (result==+0)
        res.send("Successed create new user!")
    else res.send("Failed to create new user!")
}

module.exports = {
    createNewUser
}