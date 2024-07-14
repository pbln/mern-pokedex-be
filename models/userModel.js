const mongoose = require('mongoose') 
const bcrypt  = require('bcryptjs')
const validator = require('validator')
const Schema  = mongoose.Schema

const userSchema = new Schema({
    email:{
        type:String,
        required:true , 
        unique:true
    },
    password :{
        type:String,
        required:true,
        
    }, 
    favorites: [{ type: mongoose.Schema.Types.Mixed }],

})

//static signup method
userSchema.statics.signup = async function ( email , password){
    
    if(!email  || !password){
        throw Error('All fields must be filled')
    }
    
    if(!validator.isEmail(email)){
        throw Error('Emial is not valid')
    }

    if (!validator.isLength(password, { min: 8 })) {
        errors.push('Password must be at least 8 characters long.');
      }
      if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase character.');
      }
      if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number.');
      }
      
    const exists = await this.findOne({email})
    if(exists){
        throw Error('Email already exists')
    }
   //generating salt and hash
   const salt = await bcrypt.genSalt(10)
   const hash = await bcrypt.hash(password,salt)
   const user = await this.create({email,password:hash})
return user
}


//static user login method
userSchema.statics.login = async function(email,password){
    if(!email  || !password){
        throw Error('All fields must be filled')
    }
    
    const user = await this.findOne({email})
    if(!user){
        throw Error('Incorrect email ')
    }
    
    const match = await bcrypt.compare(password , user.password)
    if(!match){
        throw Error('Incorrect password')
    }

    return user 

}

module.exports = mongoose.model('User', userSchema)