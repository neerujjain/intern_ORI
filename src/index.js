const express = require('express')
const passport= require('passport')
require('./db/mongoose')

const cors = require('cors');

var Strategy = require('passport-local').Strategy;
const convRouter = require('./routers/conv.js')
const botRouter = require('./routers/bot.js')
const userRouter = require('./routers/user.js')


const app = express()
const port = process.env.PORT || 3001
app.use(cors())
app.use(express.json())
app.use(convRouter)
app.use(botRouter)
app.use(userRouter)
app.use(passport.initialize())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
passport.use(new Strategy(
    function(username, password, cb) {
      db.users.findByUsername(username, function(err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        if (user.password != password) { return cb(null, false); }
        return cb(null, user);
      });
    }));
// app.post('/test', (req, res) => {
//     // console.log(req.params.id1.toString() )
//     // console.log(req.params.id2.toString() )
//     // var conv_add = new Conv(req.body)
//     // console.log(req.body)
//     // // console.log(conv_add)
//         //  var abcd=JSON.parse(req.body)
//         // console.log(abcd)
//         console.log(typeof( req.body.password)===String)
// })
 
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// app.post('/users', async (req, res) => {
//     const user = new User(req.body)

//     try {
//         await user.save()
//         res.status(201).send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })
/*
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})
*/

// app.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// app.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'password']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// app.delete('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
    
// })
