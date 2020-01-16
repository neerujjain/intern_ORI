const express = require('express')
const Conv = require('../models/conv')
const Bot = require('../models/bot')
const User = require('../models/user')
const auth= require('../middleware/auth')

const router= new express.Router()



router.post('/user/me/bot',auth, async  (req, res) => {
    
    try 
    {
        const id_user=req.user._id.toString()
        User.countDocuments({_id:new Object( id_user )},async (err,count)=>{
            if(count)
            {
                var bot_add=new Bot(req.body)
                bot_add.user_id=id_user
                await bot_add.save()
                await User.findByIdAndUpdate(id_user,{$push:{field_bots: bot_add._id.toString()}})

                res.status(201).send(bot_add)
            }
            else
            {
                res.status(404).send("user not found")
            }
        })
    } 
    catch (e) 
    {
        res.status(400).send(e)
    }
})


// router.get('/bot', async (req, res) => {
   

//     try 
//     {
//         const bots = await Bot.find({})
//         res.send(bots)
//     } 
//     catch (e) 
//     {
//         res.status(500).send()
//     }
// })

// see update bot error
router.patch('/user/me/bot/:id2',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['bot_name']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) 
    {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    const id_bot=new Object( req.params.id2)
    
            try 
            {
                const bot_update = await Bot.findByIdAndUpdate(id_bot, req.body, { new: true, runValidators: true })
                if (!bot_update) 
                {
                    return res.status(404).send()
                }
                res.send(bot_update)
            }
            catch (e) 
            {
                res.status(400).send(e)
            }
         
})

router.delete('/user/me/bot/:id2',auth, async (req, res) => {
    
    try 
    {
        const id_bot=new Object(req.params.id2)
        bots=req.user.field_bots
        var valid_bots=bots.filter((bot_id)=>{
            return(bot_id!==req.params.id2)
            

        })
        req.user.field_bots=valid_bots
        await req.user.save()
        const bot = await Bot.findByIdAndDelete(id_bot)
        if (!bot) 
        {
            return res.status(404).send()
        }
        res.send(bot)
        await Conv.deleteMany({bot_id:id_bot.toString()})
 
    } 
    catch (e) 
    {
        res.status(500).send()
    }        
})

module.exports=router