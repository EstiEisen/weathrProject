const mongoose = require('mongoose')
const adminSchema=mongoose.Schema({
    name:{
        type: String, require:'true'
    },
    password:{
        type:String
    },
    mail:{
        type:String
    },
    usersList:[{
        type:mongoose.Types.ObjectId, ref:"User"
    }]

})
adminSchema.pre('save',function(next){
    console.log("pre-before save")
    next()
})

module.exports=mongoose.model('Admin',adminSchema)
