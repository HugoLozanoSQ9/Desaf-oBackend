const express = require('express')
const cors = require("cors")
const app = express()

const userRouter = require('./routes/users.router')
const postRouter = require ('./routes/post.router')
const authRouter = require('./routes/auth.router')


app.use(cors())
app.use(express.json())


app.use('/users',userRouter)
app.use('/posts',postRouter)
app.use('/auth',authRouter)

app.get('/', (req, res) => {
    res.json({
        message: 'User / Post APIv1'
    })
})


module.exports = app