const mongoose = require('mongoose')
const userSchema=mongoose.Schema({
    name:{
        type: String, require:'true'
    },
    password:{
        type:String
    },
    mail:{
        type:String
    },
    adminId:{
        type:mongoose.Types.ObjectId,ref:'Admin'
    },
    whetherList:[{
        type:mongoose.Types.ObjectId,ref:'Weather'
    }]

})
userSchema.pre('save',function(next){
    console.log("pre-before save")

    next()
})

module.exports=mongoose.model('User',userSchema)
