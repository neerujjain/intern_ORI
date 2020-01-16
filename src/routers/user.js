const express = require('express')
const Conv = require('../models/conv')
const Bot = require('../models/bot')
const User = require('../models/user')
const auth= require('../middleware/auth')

// const passport= require('passport')

// var LocalStrategy = require('passport-local').Strategy;

const router= new express.Router()


router.get('/user/me',auth, async (req, res) => {

    // console.log(req)
    try 
    {
        
        res.send(req.user)
    } 
    catch (e) 
    {
        res.status(500).send()
    }
    
 })



// router.post('/test', passport.authenticate('local', { failureRedirect: '/login' }), async (req, res) => 
// {


// passport.use(new local.Strategy(
//     function(name, password, cb) {
//         console.log("1")
//       User.findOne({name}, function(err, user) {
//         if (err) { return cb(err); }
//         if (!user) { return cb(null, false); }
//         if (user.password != password) { return cb(null, false); }
//         return cb(null, user);
//       });
//     }));

// })

router.post('/user', async (req, res) => 
{
    console.log('yo')
    const user = new User(req.body)

    try 
    {
        await user.save()
        
        const token = await user.genauthtoken()
        res.status(201).send({user,token})
    } catch (e) 
    {
        res.status(400).send(e)
    }
})
// passport.use(new LocalStrategy(
//     function(username, password, done) {
//         console.log('1')
//      User.getUserByUsername(username,function(err,user)
//      {
         
//          if(err) throw err;
//          if(!user)
//          {
//              return done(null,false,{message:'unknown user'});
//         }
//         User.comparePassword(password,user.password,function(err,ismatch){
//             if(err) throw err;
//          if(ismatch)
//          {
//              return done(null,user);
//         }
//         else{
//              return done(null,false,{message:'invalid password'})
//         }
//         });
//      });
    
        
//     }));
//     passport.serializeUser(function(user, done) {
//         done(null, user.id);
//       });
      
//       passport.deserializeUser(function(id, done) {
//         User.findById(id, function(err, user) {
//           done(err, user);
//         });
//       });

// router.post('/user/login', passport.authenticate('local',{successRedirect:'/',failureRedirect:'/users/login'}), async (req, res) => {
    
//     console.log('1')
//     res.send('success')
//     res.redirect('/')
// })

router.post('/user/login', async (req, res) => {
    
    try {
        console.log(req.body.data.name)
        
        user=await User.findBycred(req.body.data.name,req.body.data.password)
        const token=await user.genauthtoken()
        res.status(201).send({user,token})
    } catch (e) {
        res.status(300).send('unable to login')
    }
})

router.get('/users/me',auth, async (req, res) => {
    try 
    {
        var ids=req.user.field_bots
        var bots=[]
        for( var i=0;i<ids.length;i++ )
        {
            bots.push(await Bot.findById(Object(ids[i])))
            
        }
        console.log('1')
        res.send(bots)
    } 
    catch (e) 
    {
        res.status(400).send()
    }
    
 })

router.post('/users/logout',auth, async (req, res) => {
    // console.log(req)
    try {
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save()
        res.status(201).send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/user/me',auth, async (req, res) => 
{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) 
    {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try 
    {
        
        updates.forEach((update)=>req.user[update]=req.body[update])
        await req.user.save()
       

        res.send(req.user)

    } catch (e) 
    {
        res.status(400).send(e)
    }
})

router.delete('/user/me',auth, async (req, res) =>
{
    try 
    {
        
        await req.user.remove()
        res.send(req.user)
        var ids=req.user.field_bots
        var bots=[]
        for( var i=0;i<ids.length;i++ )
        {
            bots.push(await Bot.findById(Object(ids[i])))
            await Bot.deleteOne({_id:Object( ids[i])})
        }
        bots.forEach( async (bot)=>{
            await Conv.deleteMany ({bot_id:bot._id.toString()})
        })
        res.send(req.user)
    } 
    catch (e) 
    {
        res.status(500).send(e)
    }        
    
})

module.exports=router
