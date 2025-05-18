const userModel = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.register = async (req, res) => {
    try{
        const {name,email,password} = req.body;
        const user=await userModel.findOne({email});
        if(user){
            return res.status(400).json({message:'User already exists'});
        }
        const hash=await bcrypt.hash(password,10);
        const newUser=await userModel.create({name,email,password:hash});
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1h'}); // Generate JWT token that expires in 1 hour
        // store this token in cookie
        res.cookie('token',token,{
            httpOnly:true,
            secure:false, // Set to true if using HTTPS
            maxAge: 3600000 // 1 hour in milliseconds
        });

        res.status(201).json({message:'User registered successfully'});

    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
