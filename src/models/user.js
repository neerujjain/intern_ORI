const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken')
const Task=require('./bot')


const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    password:
    {
        type: String,
        required: true,
        trim: true
    },
    field_bots:[String],
    tokens:[{
        token:{
            type:String,
        require:true
        }
    }]
    
})


userSchema.methods.toJSON=function() {
    const user=this
    const userObject=user.toObject()

    delete userObject.password
    delete userObject.tokens
    return userObject
    
}
userSchema.methods.genauthtoken= async function (){
    const user=this
    const token=jwt.sign({_id:user._id.toString() },'newcourse')
    user.tokens=user.tokens.concat({ token})
    await user.save()
    return token
}
userSchema.statics.findBycred= async (name,password)=>{
   try{ const user= await User.findOne({name})
    
    if(!user){
        
        throw new Error('unable to login')
    }
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
            
            throw new Error('unable to login')
        }
        
        return user
    }catch(Error)
    {
        throw Error 
    }
}

userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User
module.exports.getUserByUsername=function(username,calllback)
{
    var query={name:username}
    User.findOne(query,callback);
}
module.exports.comparePasswor=async (password,hash,calllback)=>
{
    try{
    const isMatch= await bcrypt.compare(password,hash)
    callback(null,isMatch)
    }
    catch(Error){
        throw Error
    }
        
}
