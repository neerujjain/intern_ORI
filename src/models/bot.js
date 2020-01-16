const mongoose = require('mongoose')
const validator = require('validator')



const Bot = mongoose.model('Bot', {
    bot_name: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports =Bot

