const express = require('express')
const mongoose = require('mongoose')
const checkLogIn = require('../middleware/checkLogIn')
const informSchema = require('../Schemas/informSchema')
const Inform = new mongoose.model("Inform",informSchema)


const router = express.Router()

//post method
router.post('/',async (req,res)=>{
    try{
        const newInform = await Inform(req.body)
        newInform.save()
        res.status(200).json({
            message:'new Data inserted successfully '
        })
    }
    catch{
        res.status(500).json({
            error:'thare was server a side error, Check your server "Code"'
        })
    }
})

//multiple post method
router.post('/all',async(req,res)=>{
    try{
        await Inform.insertMany(req.body)
        res.status(200).json({
            message:'Many Data inserted Successfully'
        })
    }
    catch{
        res.status(500).json({
            error:'thare was server a side error, Check your server CODE'
        })
    }
})

router.get('/',checkLogIn,async (req,res)=>{
    console.log(req.username)
    console.log(req.userId)
    try{
        const data = await Inform.find({})
        res.status(200).json({
            data:data
        })
    }
    catch{
        res.status(500).json({
            error:'thare was server a side error, Check your server CODE'
        })
    }
})

router.get('/:id',async (req,res)=>{
    try{
        const data = await Inform.find({_id:req.params.id})
        res.status(200).json({
            data:data
        })
    }
    catch{
        res.status(500).json({
            error:'thare was server a side error, Check your server CODE'
        })
    }
})

router.put('/:id',async (req,res)=>{
    try{
         await Inform.updateOne({_id:req.params.id},{$set:{desciption:'this is not a desciption'}})
        res.status(200).json({
            message:'update successfull'
        })
    }
    catch{
        res.status(500).json({
            error:'thare was server a side error, Check your server CODE'
        })
    }
})

router.delete('/:id',async (req,res)=>{
    try{
         await Inform.deleteOne({_id:req.params.id})
        res.status(200).json({
            message:'delete Successfull'
        })
    }
    catch{
        res.status(500).json({
            error:'thare was server a side error, Check your server CODE'
        })
    }
})













module.exports = router