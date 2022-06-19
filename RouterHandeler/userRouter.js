const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = require('../Schemas/userSchema')
const User = new mongoose.model("User",userSchema)


const router = express.Router()

//SINGUP

router.post('/singup',async (req,res)=>{
    try{
        const hashedPassword =await bcrypt.hash(req.body.password,10)
        const newUser = new User({
            name:req.body.name,
            username:req.body.username,
            password: hashedPassword
        });
        await newUser.save()
        res.status(200).json({
        message:'SingUp was successfully'
    })
    }
    catch{
        res.status(500).json({
            error:'sing up is not successfull'
        })
    }
})

router.post('/login',async (req,res)=>{
    try{
        const user = await User.find({username:req.body.username});
        if(user && user.length > 0){
            const isValidPassword =await bcrypt.compare(req.body.password,user[0].password)

                if(isValidPassword){
                    //Genarate Token
                    const token = jwt.sign({
                        username:user[0].username,
                        userId :user[0]._id,
                    },process.env.JWT_SECRET,{
                        expiresIn:'1h'
                    })
                    res.status(200).json({
                        "access Token":token,
                        "login":"Login successfull"
                    })

                }else{
                    res.status(401).json({
                        error:'Authintication Failled '
                    })
                }

        }else{
            res.status(401).json({
                error:'Authintication Failled '
            })
        }
    }
    catch{
        res.status(401).json({
            error:'Authintication Failled '
        })
    }
})







module.exports = router