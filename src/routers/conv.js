const express = require('express')
const Conv = require('../models/conv')
const Bot = require('../models/bot')
// const User = require('../models/user')
const auth= require('../middleware/auth')

const router= new express.Router()


const endid=async (id_bot)=>{
    const convs= await Conv.find({bot_id:id_bot })
    var conv_prev= convs.find((conv)=>{
        if(conv.prev==="nul")
        {
            return conv
        }
    })
    var i,id_con,conv_curr
    for( i=0;i<(convs.length-1) ;i++)
    {
        if(!(conv_prev.nextext==="null"||id_con==="null"))
        {
            conv_curr=await convs.find( (conv)=>{
                if((conv_prev.type==="text")&&(conv.prev===conv_prev.id.toString()))
                { 
                    return conv
                }
                else if (conv_prev.type==="text_with_buttons")
                {
                    conv_prev.payload.buttons.forEach((button)=>
                    {
                        if(button.active===true)
                        {
                            id_con= button.nexbutton;
                        }
                    })
                    if(conv.id.toString()===id_con)
                    {
                        return conv
                    }
                }
                if(((id_con==="null")&&conv.id==conv_prev.id)||((conv.nextext==="null")&&conv.id==conv_prev.id))
                {
                    return conv
                }
            })
            conv_prev=conv_curr
        }
    }
    return conv_prev.id
}


//adding message in end
router.post('/user/me/bot/addtext/:id',auth, async (req, res) => 
{
   
    const id_bot=  req.params.id
    // console.log(req.body)
    Bot.countDocuments({_id:new Object( id_bot )},async (err,count)=>{

        if(count)
        {
            Conv.countDocuments( {bot_id:new Object( id_bot )},async ( err, cnt)=>{
            
            var conv_add  = new Conv(req.body)
            conv_add.bot_id=id_bot
            
            
            try
            {
                if(cnt)
                { 
                    
                    console.log('hello')
                    
                    const conv_end_id= await endid(id_bot)
                    // console.log(conv_end_id)
                    
                    // console.log(conv_end_id)
                    const conv_end= await Conv.findById(conv_end_id )
                    // console.log(conv_end)
                    //text after text
                    if((conv_end.type==="text")&&(conv_add.type==="text"))
                    {
                        conv_end.nextext=conv_add._id.toString()
                        conv_add.prev=conv_end._id.toString()
                        conv_add.nextext="null"  
                    }  
                    //button after text
                    else if((conv_end.type==="text")&&(conv_add.type==="text_with_buttons"))
                    {
                        conv_end.nextext=conv_add._id.toString()
                        conv_add.prev=conv_end._id.toString()
                        conv_add.payload.buttons[0].active=true
                    }
                    // text after button
                    else if((conv_end.type==="text_with_buttons")&&(conv_add.type==="text"))
                    {
                        // console.log(conv_end)
                        // console.log('1')
                        await conv_end.payload.buttons.forEach((button,i)=>{
                            if(button.active==true)
                            {
                                conv_add.prevbutid=i
                                button.nexbutton=conv_add._id.toString()
                            }
                        })
                        conv_add.prev=conv_end._id.toString()
                        conv_add.nextext="null"
                        // console.log(conv_add)

                    }
                    //button after button
                    else if((conv_end.type==="text_with_buttons")&&(conv_add.type==="text_with_buttons"))
                    {
                        await conv_end.payload.buttons.forEach((button,i)=>{
                            if(button.active==true)
                            {
                                conv_add.prevbutid=i
                                button.nexbutton=conv_add._id.toString()
                            }
                        })
                        conv_add.prev=conv_end._id.toString()
                        conv_add.payload.buttons[0].active=true
                    }
                    // console.log(conv_end.payload)
                    await conv_end.save()           
                    
                // res.status(200).send(conv_add)     
                }
                else if(conv_add.type==="text_with_buttons")
                {
                    console.log('1')
                   conv_add.payload.buttons[0].active=true
                    conv_add.prev="nul"
                }  
                else if(conv_add.type==="text")
                {
                    console.log('2')
                     conv_add.nextext="null"
                    conv_add.prev="nul"
                    
                } 
                await conv_add.save()
                
                // console.log(conv_add)
                res.status(200).send(conv_add)                           
            }
        
            catch (e)
            {
            res.status(400).send(e)
            }

            })
        }
        else
        {
            res.status(400).send("enter valid bot id ")
        }
    })
})


// changing index of button
router.get('/user/me/bot/:id2/button/:msgid/:id3',auth, async (req, res) => 
{
   
    // console.log('1')
        
    const id_bot= req.params.id2
    
            const buttonid=req.params.id3
            try
            {
                let conv_temp=await Conv.findById(req.params.msgid)
                conv_temp.payload.buttons.forEach((button)=>{ button.active=false})
                conv_temp.payload.buttons[buttonid-1].active=true                
                await conv_temp.save()
                res.status(200).send(conv_temp)                           
            }
        
            catch (e)
            {
            res.status(400).send(e)
            }

})




//adding message after a message by id
router.post('/user/me/bot/:id2/conv/:id3',auth, async (req, res) => 
{ 
    // console.log('inside middle')
    const id_bot= Object(req.params.id2)
    console.log(req.body)
    var conv_add = new Conv(req.body)
    prev_id=Object(req.params.id3)
    conv_add.bot_id=id_bot
    
    try
    {
        
        var conv_prev= await Conv.findById(prev_id)
        var id_nex
        if(conv_prev.type==="text_with_buttons")
        {
            await conv_prev.payload.buttons.forEach(async (button)=>{
                if(button.active===true)
                {
                    id_nex=button.nexbutton
                    button.nexbutton=conv_add._id.toString()
                }
            })
        }
        else if(conv_prev.type==="text")
        {
            id_nex=conv_prev.nextext
            conv_prev.nextext=conv_add._id.toString()
        }
        var conv_next= await Conv.findById(Object(id_nex))
        
        conv_add.prev=prev_id.toString()
        conv_add.prevbutid=conv_next.prevbutid
        if(conv_add.type==="text_with_buttons")
        {
            conv_add.payload.buttons[0].nexbutton=id_nex
            conv_next.prevbutid=0
            conv_add.payload.buttons[0].active=true
            
        }
        else if(conv_add.type==="text")
        {
            conv_next.prevbutid=-1
            // id_nex=conv_prev.nextext
            conv_add.nextext=id_nex
        }
        // conv_add.nextext=id_nex
        conv_next.prev=conv_add._id.toString()
         await conv_add.save()
         await conv_prev.save()
         await conv_next.save()
        res.status(200).send("adding"+conv_add)     
    }
    catch (e)
    {
    res.status(400).send(e)
    }

})



//read whole conversation
router.get('/user/me/bot/:id2',auth, async (req, res) => {

    const id_bot= req.params.id2
    Conv.countDocuments({bot_id:id_bot}, async ( err, count)=>{
        try
        { 
            if(count)
            { 
                           
                const convs= await Conv.find({bot_id:id_bot })
                var conv_prev= convs.find((conv)=>{
                    if(conv.prev==="nul")
                    {
                        return conv
                    }
                })

                var i,f,id_con
                var con=[]
                con.push(conv_prev)
                for( i=0;i<(convs.length-1);i++)
                {
                    if(!(conv_prev.nextext==="null"||id_con==="null"))
                    {
                        conv_curr=await convs.find( (conv)=>{
                            if((conv_prev.type==="text")&&(conv.prev===conv_prev.id.toString()))
                            {
                                con.push(conv)
                                return conv
                            }                                    
                            else if (conv_prev.type==="text_with_buttons")
                            {
                                conv_prev.payload.buttons.forEach((button)=>
                                {
                                    if(button.active===true)
                                    {
                                        id_con= button.nexbutton;
                                    }
                                })
                                if(conv.id.toString()===id_con)
                                {                                            
                                    con.push(conv)
                                    return conv
                                }
                            }
                            
                            if(((id_con==="null")&&conv.id==conv_prev.id)||((conv.nextext==="null")&&conv.id==conv_prev.id))
                            {
                                return conv
                            }
                        })
                    conv_prev=conv_curr     
                    }  
                }
                res.status(200).send(con)
            }
            else
            {
                res.status(201).send("no data")
            } 
        }
        catch(err)
        {
            res.status(500).send(err)
        }

    })
        
})



router.patch('/user/me/bot/:id2/conv/:id3',auth, async (req, res) => {
    console.log('1')
    
    const updates = Object.keys(req.body)
    console.log(req.body)
    const allowedUpdates = ['type','sender','text','buttons','subtitle']
    // console.log(req.body.payload.text)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) 
    {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    // const id_bot=req.user.field_bots[ req.params.id2-1]
    const id_bot=req.params.id2
    Bot.countDocuments({_id:new Object( id_bot )},async (err,cnt)=>{

        if(cnt)
        {                    
            try 
            {
                // console.log('abcd')
                conv_update=await Conv.findById(req.params.id3)
                // console.log(conv_update.payload)
                const payload_id=conv_update.payload._id
                // console.log(payload_id)
                if(updates.includes('text')&&conv_update.type==='text')
                {              
                    
                   conv_update.payload.text=req.body['text']
                }
                else if(updates.includes('text')&&conv_update.type==='text_with_buttons')
                {
                    // console.log('2')
                    await conv_update.payload.buttons.forEach(async (button)=>{
                        if(button.active===true)
                        {
                            conv_update.nextext=button.nexbutton
                        }
                    })
                    var payload_body={
                        "payload":{
                            "text":req.body.text
                        }
                    }
                    var conv_temp  = new Conv(payload_body)
                    console.log(conv_temp)
                   conv_update.payload=conv_temp.payload
                    conv_update.type='text'
                }
                else if(updates.includes('buttons')&&conv_update.type==='text')
                {

                    // conv_update.text="null"
                    id_nex=conv_update.nextext
                    var payload_body={
                        "payload":{
                            "buttons":req.body.buttons,
                            "subtitle":req.body.subtitle
                        }
                    }
                    var conv_temp  = new Conv(payload_body)
                    // console.log(conv_temp.payload.buttons)
                    conv_update.payload=conv_temp.payload
                    conv_temp.payload.buttons[0].active=true
                    conv_temp.payload.buttons[0].nexbutton=id_nex
                    conv_update.nextext=''
                    conv_update.type='text_with_buttons'
                    
                } 
                //test this one
                else if(updates.includes('buttons')&&conv_update.type==='text_with_buttons')
                {
                    const old_length=conv_update.payload.buttons.length  
                    // console.log(req.body.buttons)
                    
                    var payload_body={
                        "payload":{
                            "buttons":req.body.buttons,
                            "subtitle":req.body.subtitle
                        }
                    }
                    var conv_temp  = new Conv(payload_body)
                    
                    const new_length=conv_temp.payload.buttons.length
                    var old_buttons=conv_update.payload.buttons
                    if(old_length<=new_length)
                    {
                        conv_update.payload.buttons.forEach((button,i)=>{
                            conv_temp.payload.buttons[i].nexbutton=old_buttons[i].nexbutton
                            conv_temp.payload.buttons[i].active=old_buttons[i].active
                        })
                        conv_update.payload=conv_temp.payload
                        console.log(conv_update.payload.buttons)

                    }
                    else if(old_length>new_length)
                    {
                        var flag=0
                        conv_temp.payload.buttons.forEach((button,i)=>{
                            conv_temp.payload.buttons[i].nexbutton=old_buttons[i].nexbutton
                            conv_temp.payload.buttons[i].active=old_buttons[i].active
                            if(old_buttons[i].active===true)
                            {
                                flag=1
                            }
                        })
                        conv_update.payload=conv_temp.payload
                        if(flag===0)
                        {
                            conv_update.payload.buttons[0].active=true
                        }
                        console.log(conv_update.payload.buttons)

                    }
                
            }         
                // console.log(conv_update)
                await conv_update.save()       
                if (!conv_update) 
                {
                    return res.status(404).send()
                }
                res.send(conv_update)
            }
            catch (e) 
            {
                res.status(400).send(e)
            }
        }
        else
        {
            res.status(400).send("no bot found")
        }
    })
})

const delete_all= async (id)=>{
    if(id==="null")
    {
     return null
    }
    else 
    {    
        conv_delete=await Conv.findByIdAndDelete(id)    
        // conv_delete=await Conv.findById(id)
        // console.log(conv_delete)
        if(conv_delete.type==="text_with_buttons")
        {
            // console.log('hey')
            conv_delete.payload.buttons.forEach((button)=>{
                console.log(button.nexbutton)
                if(button.nexbutton!=="null")
                {
                    // console.log(button.text)
                delete_all(button.nexbutton)
                }
            })
            // delete_button()
        }
        else
        {
            if(conv_delete.nextext!=="null")
            {
                // console.log(conv_delete.text)
            delete_all(conv_delete.nextext)
            }
        }
    }
    // while(conv_delete.nextext!=null)
    
}
router.delete('/user/me/bot/:id2/conv/:id3',auth, async (req, res) => {

    const id_bot=req.params.id2
            const conv_delete = await Conv.findById (req.params.id3)
            try
            {
                // console.log('1')
                if(conv_delete.type==="text_with_buttons")
                {
                    // console.log('2')
                    // console.log(conv_delete)
                    var id_nex
                    var buttonid=conv_delete.prevbutid
                    await conv_delete.payload.buttons.forEach(async (button)=>{
                        if(button.active===true)
                        {
                            id_nex=button.nexbutton
                        }
                        else
                        {
                            console.log('yo')
                            await delete_all(button.nexbutton)
                        }
                    })
                    // console.log('3')
                    if(conv_delete.prev!=="nul")
                    {
                         conv_prev=await Conv.findById(conv_delete.prev)
                    }
                    else if(conv_delete.prev==="nul")
                    {
                         conv_prev=conv_delete
                    }
                    if(id_nex!=="null")
                    {
                         conv_next=await Conv.findById(Object(id_nex))
                    }
                    else if(id_nex==="null")
                    {
                         conv_next=conv_delete
                    }
                    // console.log('4')
                    conv_next.prevbutid=buttonid
                    conv_next.prev=conv_prev.id.toString()
                    // console.log('5')
                    if(buttonid===-1)
                    {                    
                        conv_prev.nextext=id_nex
                    }
                    else{
                        conv_prev.payload.buttons[buttonid].nexbutton=id_nex
                    }
                    // console.log('6')
                }
                else
                {
                    const id_nex=conv_delete.nextext
                    // console.log('2')
                    if(conv_delete.prev!=="nul")
                    {
                        conv_prev=await Conv.findById(conv_delete.prev)
                    }
                    else if(conv_delete.prev==="nul")
                    {
                        conv_prev=conv_delete
                    }
                    if(id_nex!=="null")
                    {
                        conv_next=await Conv.findById(id_nex)
                    }
                    else if(id_nex==="null")
                    {
                        conv_next=conv_delete
                    }      
                    // console.log('3')           
                    conv_next.prevbutid=conv_delete.prevbutid
                    conv_next.prev=conv_prev.id.toString()
                    // console.log('4')
                    if(conv_prev.type==="text_with_buttons")
                    {
                        conv_prev.payload.buttons[conv_delete.prevbutid].nexbutton=id_nex
                    }
                    else
                    {
                        conv_prev.nextext=id_nex
                    }
                    // console.log('5')

                }
                if(conv_next.prev===req.params.id3)
                {
                    conv_next.prev="nul"
                    // await conv_next.save()
                }
                else if(conv_next.id===conv_delete.id)
                {                    
                    await conv_prev.save()
                }
                else
                {
                    await conv_next.save()
                    await conv_prev.save()

                }
                console.log(conv_next)
                console.log(conv_prev)
                Conv.findByIdAndDelete(req.params.id3,(e,conv)=>{
                        res.status(201).send("deleting"+ conv)
                    })
                // res.status(201).send("deleting"+conv_delete)
    
                if (!conv_delete) 
                {
                    return res.status(404).send()
                }
            }
            catch(e)
            {
                res.status(500).send(e)
            }
        
})




module.exports=router


// was in delete conv


// Conv.findByIdAndDelete(req.params.id3,(e,conv)=>{
                //     res.status(201).send("deleting"+ conv_delete)
                // })
                // if(conv_delete.prev==="nul"&&conv_delete.nextext==="null")
                // {
                //     return true
                // }
                // else if(conv_delete.nextext==="null")
                // {
                //     const conv_prev = await Conv.findByIdAndUpdate (conv_delete.prev,{nextext:"null"})
                // }
                // else if(conv_delete.prev==="null")
                // {
                //     const conv_prev = await Conv.findByIdAndUpdate (conv_delete.nextext,{prev:"null"})
                // }
                // else
                // {
                //     const conv_prev = await Conv.findByIdAndUpdate (conv_delete.prev,{nextext:conv_delete.nextext})
                //     const conv_nex = await Conv.findByIdAndUpdate (conv_delete.nextext,{prev:conv_delete.prev})
                // // }
                // Conv.findByIdAndDelete(req.params.id3,(e,conv)=>{
                //     res.status(201).send("deleting"+ conv_delete)
                // })
                
// addbutton to button end at given index
// router.post('/user/me/bot/:id2/button/:msgid/:id3/addbutton',auth, async (req, res) => 
// {
    //     const id_bot= req.user.field_bots[ req.params.id2-1]
    //     Bot.countDocuments({_id:new Object( id_bot )},async (err,count)=>{
                
    //         if(count)
    //         {
    //             Conv.countDocuments({bot_id:id_bot}, async ( err, cnt)=>{
    //             var conv_add  = new Conv(req.body)
    //             conv_add.bot_id=id_bot
    //             try
    //             {
    //                 let conv_temp=await Conv.findById(req.params.msgid)
                             
    //                 conv_temp.buttons.forEach((button)=>{ button.active=false})
    //                 conv_temp.buttons[buttonid].active=true
    //                 conv_add.prev=conv_end._id.toString()
    //                 conv_add.nextext="null"             
    //                 conv_add.prevbutid=0
    //                 const nexbutton=conv_add.buttons.map((button)=> "null")
    //                 conv_add.nexbutton=nexbutton;           
    //                 await conv_add.save()
    //                 res.status(200).send("adding"+conv_add)                  
    //             }
                     
    //             catch (e)
    //             {
    //             res.status(400).send(e)
    //             }
              
    //             })
    //         }
    //         else
    //         {
    //             res.status(400).send("enter valid bot id ")
    //         }
    //     })
    // })
              
                
