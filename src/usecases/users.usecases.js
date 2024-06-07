
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

async function getAll(){
    const allUsers = await Users.find()
    return allUsers
}

async function getById(id){
    
    const user = await Users.findById(id)
    return user
}


async function deleteById(id){
    const userDeleted = await Users.findByIdAndDelete(id)
    if(!userDeleted) throw new Error('User does not exists') 
    return userDeleted
}

async function updateByID(id,newUserData){
    const updatedUser = await Users.findByIdAndUpdate(id,newUserData, {new:true})
    return updatedUser

}

module.exports = {
    create,
    getAll,
    deleteById,
    getById,
    updateByID
}