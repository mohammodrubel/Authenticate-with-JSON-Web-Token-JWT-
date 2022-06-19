const express = require ('express')
const mongoose = require('mongoose')
const informRouter = require('./RouterHandeler/informRouter')
const userRouter = require('./RouterHandeler/userRouter')
const dotenv = require('dotenv')

const app = express()
dotenv.config()
app.use(express.json())


// Database Connection 
mongoose.connect('mongodb://localhost/information')
    .then(()=>console.log('DatabaseConnection running...'))
    .catch(err => console.log(err))

//Router
app.use('/inform',informRouter)
app.use('/user',userRouter)

// express error 
const  errorHandelr =  (err,req,res,next)=>{
    if(res.headersent){
        return next(err)
    }
    res.status(500).json({
        error : err
    })
}

app.use(errorHandelr)
app.listen(5000,()=>{
    console.log('server is running')
})