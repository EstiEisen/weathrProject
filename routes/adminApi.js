const router =require('express').Router()

const admin = require('../controller/admin')
router.post('/addAdmin',admin.addAdmin )
router.get('/login/:id',admin.login )
router.get('/getAllUser/:id',admin.getAllUser )
router.delete('/deleteUserAndHisHistory/:id/:userId',admin.deleteUserAndHisHistory)
module.exports=router