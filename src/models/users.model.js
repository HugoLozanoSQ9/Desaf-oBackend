const mongoose = require('mongoose')
const modelName = 'Users'
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now

    },
    updatedAt: {
        type: Date,
        default: Date.now

    }
})

module.exports = mongoose.model(modelName, schema)