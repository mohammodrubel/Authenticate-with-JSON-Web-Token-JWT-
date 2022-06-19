const mongoose = require('mongoose')
const informSchema =  mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desciption:String,
    mobileNumber:Number,
    status:{
        type:String,
        enum:['active','inactive']
    }
})


module.exports = informSchema