const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const login = async (req, res) => {
    try{
       
        
        const {email , password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(404).json({success : false , message : "Invalid Credentials"})
        }
        const comparePassword = await bcrypt.compare(password,user.password);
        if(!comparePassword){
            res.status(404).json({success : false , message : "Invalid Credentials"})
        }
        const token = jwt.sign({_id : user._id , role : user.role}, process.env.JWT_SECRETKEY,{expiresIn : '24h'} )
        const { password: userPassword, ...userWithoutPassword } = user._doc;
        res.status(200).json({success : true , message : 'User login' , token , user : userWithoutPassword})

    }
    catch(error){
        res.status(500).json({success : false , error : error.message})
        console.log(error);
        
    }
};
const verify = async (req, res) => {
    try{
        return res.status(200).json({success : true , user : req.user})

    }
    catch(error){
        res.status(500).json({success : false , error : error.message})
        console.log(error);
        
    }
};
module.exports = {
  login, verify
};
