const Post = require('../models/post.model')
const usersModel = require('../models/users.model')

const createError = require('http-errors')

async function create(postData) {
    const newPost = await Post.create(postData)
    return newPost
}

async function getAll() {
    const allPosts = await Post.find().populate("user")
    return allPosts
}

async function deleteById(id) {
    const postDeleted = await Post.findByIdAndDelete(id)
    if (!postDeleted) throw createError(404, "Post not found")
    return postDeleted
}

async function updateByID(id, newPostData) {
    newPostData.updatedAt = Date.now()
    const updatedPost= await Post.findByIdAndUpdate(id, newPostData, { new: true })
    if (!updatedPost) throw createError(404, "Post not found")

    return updatedPost

}

module.exports = {
    create,
    getAll,
    deleteById,
    updateByID
}