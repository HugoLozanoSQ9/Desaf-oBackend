const Post = require('../models/post.model')

const createError = require('http-errors')

async function create(postData) {
    const newPost = await Post.create(postData)
    return newPost
}

async function getAll() {
    const allPosts = await Post.find().populate("user")
    return allPosts
}

async function deleteById(id,userId) {

    const postActual = await Post.findById(id)
    
    if(!postActual) throw createError(404, "Post not found")

    if (userId != postActual.user) {
        throw createError(401, "You cant delete this post, you not the owner")
    }

    const postDeleted = await Post.findByIdAndDelete(id)  

    if (!postDeleted) throw createError(404, "Post not found")

    return postDeleted

}

async function updateByID(id, newPostData) {
    newPostData.updatedAt = Date.now()
    const actualPost = await Post.findById(id)
    if(actualPost.user != newPostData.user) throw createError(409, "you cant update a user")

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