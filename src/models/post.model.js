const mongoose = require('mongoose')
const modelName = 'Post'
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
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