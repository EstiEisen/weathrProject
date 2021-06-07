const mongoose = require('mongoose')
const weatherSchema=mongoose.Schema({
    temp:{
        type:Number
    },
    feels_like:{
        type:Number
    },
    temp_min:{
        type:Number
    },
    temp_max:{
        type:Number
    },
 
    wind:{
        speed:{type:Number},
        deg:{type:Number},
        gust:{type:Number},



    },
 
userId:{
    type:mongoose.Types.ObjectId, ref:'User'
}
})
module.exports =mongoose.model('Weather',weatherSchema)