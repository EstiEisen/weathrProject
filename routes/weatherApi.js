const router =require('express').Router()

const weather = require('../controller/whather')
router.get('/getWeather/:id/:city',weather.getWeather)
router.get('/getUserHistory/:id',weather.getUserHistory)
router.delete('/deleteFromHistory/:id/:weatherId',weather.deleteFromHistory)


module.exports=router