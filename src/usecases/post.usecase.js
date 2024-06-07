const Post = require('../models/post.model')
const createError = require('http-errors')

async function create(postData) {

    if (!postData.title) throw createError(400, "Data is required")

    const newPost = await Post.create(postData)
    return newPost
}
// solucionar el populate
async function getAll() {
    const allPosts = await Post.find().populate("user")
    return allPosts
}

async function deleteById(id) {
    const postDeleted = await Post.findByIdAndDelete(id)
    if (!postDeleted) throw new Error('Post does not exists') 
    return postDeleted
}

async function updateByID(id, newPostData) {
    newPostData.updatedAT = Date.now
    const updatedPost= await Post.findByIdAndUpdate(id, newPostData, { new: true })

    return updatedPost

}

module.exports = {
    create,
    getAll,
    deleteById,
    updateByID
}