const usersUsecase = require('../usecases/users.usecases')

const express = require('express')

const router = express.Router()

//const auth = require('../middlewares/auth.middleware')



router.post('/',async(req,res)=>{
    
    try { 
        
        const userCreated = await usersUsecase.create(req.body) 
        
        res.json({
            success:true,
            data:{
                koder : userCreated
            }
        })
    } catch (error) {

        res.status(error.status || 500)
        res.json({
            success:false,
            error: error.message
        })
    }
})

router.get('/:id', async (req,res)=>{
    try {
        
        const {id} = req.params
        
        const user = await usersUsecase.getById(id) 
        
        res.json({
            success:true,
            data:{
                user
            }
        })
    } catch (error) { 
        res.status(error.status || 500)
        res.json({
            success:false,
            error: error.message
        })
    }
    
})



module.exports = router