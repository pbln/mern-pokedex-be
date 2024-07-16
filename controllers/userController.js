const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken =(_id)=>{
jwt.sign({_id},process.env.SECRET , {expiresIn:'3d'})
}

// login user
const loginUser =async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await User.login(email ,password)
        // create a token
        const token = createToken(user._id)
        res.status(200).json({user,token})
       } catch(error){
       res.status(400).json({error:error.message})
       }
}

//signup user

const signupUser =async(req,res)=>{
    const {email,password} = req.body

    try{
     const user = await User.signup(email ,password)
     // create a token
     const token = createToken(user._id)
     res.status(200).json({user,token})
    } catch(error){
    res.status(400).json({error:error.message})
    }
    }

// add fav

const addfav = async(req,res)=>{
    const {email , pokemon} = req.body 
    
    try{
      const user = await User.findOne({email}) ;

      if(!user)  return res.status(404).json({ error: 'User not found' });
      
      user.favorites.push(pokemon);
      await user.save()

      res.status(200).json({ message: 'Favorite Pokémon added successfully', user });
    }catch (error){
        res.status(500).json({ error: 'Server error' });
    }

}

const dltfav = async (req,res)=>{
    const { email, pokemon } = req.body;
    try {
      const user = await User.findOne({email});
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      
      user.favorites = user.favorites.filter(fav => fav.name.toLowerCase() !== pokemon.name.toLowerCase());
      await user.save();
  
      res.status(200).json({ message: 'Favorite Pokémon removed successfully', user });
    } catch (error) {
      console.error('Error removing favorite:', error);
      res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {loginUser , signupUser , addfav,dltfav}
