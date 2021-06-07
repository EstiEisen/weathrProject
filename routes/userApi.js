const router =require('express').Router()

const user = require('../controller/user')
router.post('/addUser',user.addUser )
router.get('/login/:id',user.login )

module.exports=router