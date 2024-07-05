const postUsecase = require('../usecases/post.usecase')

const express = require('express')

const router = express.Router()

const auth = require('../middlewares/auth.middleware')

router.get('/', async (req, res) => {
    try {
        const { search } = req.query

        const post = await postUsecase.getAll(search)

        res.json({
            success: true,
            data: {
                post
            }
        })

    } catch (error) {
        res.status(error.status || 500)
        res.json({
            success: false,
            error: error.message
        })
    }

})


router.post('/', auth, async (req, res) => {

    try {

        const { authorization } = req.headers
        const token = authorization
        const separar = () => {
            const separado = token.split(".")
            return separado
        }

        const tokenUser = separar()[1]

        const userId = JSON.parse(atob(tokenUser)).id
        const postCreated = await postUsecase.create(req.body, userId)

        res.json({
            success: true,
            data: {
                post: postCreated
            }
        })
    } catch (error) {
        res.status(error.status || 500)
        res.json({
            success: false,
            error: error.message
        })
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {

        const { id } = req.params
        const { authorization } = req.headers
        const token = authorization
        const separar = () => {
            const separado = token.split(".")
            return separado
        }

        const tokenUser = separar()[1]

        const userId = JSON.parse(atob(tokenUser)).id

        const postDeleted = await postUsecase.deleteById(id, userId)

        res.json({
            success: true,
            data: {
                post: postDeleted
            }
        })

    } catch (error) {

        res.status(error.status || 500)
        res.json({
            success: false,
            error: error.message
        })
    }
})

router.patch('/:id', auth, async (req, res) => {
    try {

        const { authorization } = req.headers
        const token = authorization
        const separar = () => {
            const separado = token.split(".")
            return separado
        }

        const tokenUser = separar()[1]

        const userId = JSON.parse(atob(tokenUser)).id

        const { id } = req.params

        const postUpdated = await postUsecase.updateByID(id, req.body, userId)

        res.json({
            success: true,
            data: { post: postUpdated }
        })

    } catch (error) {
        //57
        res.status(error.status || 500)
        res.json({
            success: false,
            error: error.message
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const post = await postUsecase.getById(id)

        res.json({
            success: true,
            data: {
                post
            }
        })

    } catch (error) {
        res.status(error.status || 500)
        res.json({
            success: false,
            error: error.message
        })
    }

})
module.exports = router