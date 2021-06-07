const express=require('express')
const dotenv=require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRouter=require('./routes/userApi')
const weatherRouter=require('./routes/weatherApi')
const adminRouter=require('./routes/adminApi')
const jwt=require('jsonwebtoken')

const app=express();
dotenv.config();
const connectionParams ={
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}
mongoose.connect(process.env.DB_CONNECT,connectionParams)
.then(()=>{
    console.log('Connect')
})
.catch((err)=>{
    console.log(`erroe connection ${err}`)
})
app.use(bodyParser.json())
app.use('/weather',function(req,res,next){
    console.log("middleware")
    try{
        jwt.verify(req.headers['authorization'],process.env.MY_SECRET)
        next()
    }
    catch{
        res.send("not good")
    }
})
app.use('/admin',function(req,res,next){
    console.log("middleware")
    if(!req.path.startsWith('/admin/login') && !req.path=='/admin/addAdmin'){
    try{
        jwt.verify(req.headers['authorization'],process.env.MY_SECRET)
        next()
    }
    catch{
        res.send("not good-the adminToken wrong")
    }}
    next()
})
app.use('/user',function(req,res,next){
    console.log("middleware")
    if(!req.path.startsWith('/user/login') && !req.path=='/user/addUser')
    {
    try{
        jwt.verify(req.headers['authorization'],process.env.MY_SECRET)
        next()
    }
    catch{
        res.send("not good the UserToken wrong")
    }}
    next()
})
app.use('/user',userRouter)
app.use('/weather',weatherRouter)
app.use('/admin',adminRouter)
app.listen(3000,()=>{
    console.log('listening on 3000')
})
