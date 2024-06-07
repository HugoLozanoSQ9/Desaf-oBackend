//segundo 
const jwt = require('../lib/jwt')
const encrypt = require('../lib/encrypt')
const User = require('../models/users.model')
const createError = require('http-errors')


async function login(email, password) {

    const user = await User.findOne({ email: email })

    if (!user) throw createError(401, "Invalid data mail")

    const isPasswordValid = await encrypt.compare(password, user.password)

    if (!isPasswordValid) throw createError(401, "Invalid data pass")

    const token = jwt.sign({ id: user._id })

    return token

}

module.exports = {
    login
}