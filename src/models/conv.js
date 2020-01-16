
const mongoose = require('mongoose')

const payload_schema = new mongoose.Schema( {
    text: {
        type: String,
        trim: true
    },
    subtitle: {
        type: String,
        trim: true
    },
    buttons: [
        {
            text:{
                type:String,
                default:""
            },
            nexbutton:{
                type:String,
                default:"null"
            },
            active:{
                type:Boolean,
                default:false
            }
        }
    ]

})

const convSchema= new mongoose.Schema({
    type: {
        type: String,
        trim: true,
        default:"null"

    },
    
    payload:{           
        type:payload_schema
    },
    sender:{
        type:String,
        required: true,
        validate(value){if (!(value==="chatbot"||value==="customer")) { throw new Error('enter type as chatbot or customer')}}
        
    },
 prev:{
     type:String,
     default:""
 },
 nextext:{
     type:String,
     default:""
 },
 
 prevbutid:{
    type:Number,
    default:-1
 },

 bot_id:{
     type:String,
     default:" null"
 }
})


const Conv = mongoose.model('Conv', convSchema)
module.exports = Conv

