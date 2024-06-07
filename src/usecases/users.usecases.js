
const usersModel = require('../models/users.model')
const Users = require('../models/users.model')
const createError = require('http-errors')
const encrypt = require("../lib/encrypt")

async function create(userData){
    const userFound = await usersModel.findOne({email:userData.email})

    if(userFound)throw createError(409, "Email alredy in use")

    userData.password = await encrypt.encrypt(userData.password)

    const newUser = await Users.create(userData)
    return newUser
}


async function getById(id){
    
    const user = await Users.findById(id)
    return user
}



module.exports = {
    create,
    getById
}