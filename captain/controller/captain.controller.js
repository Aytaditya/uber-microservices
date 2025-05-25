const userModel = require('../models/captain.models');
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
        delete newUser._doc.password; // Remove password from response
        return res.status(200).json({message:'User registered successfully'},token,newUser);

    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
}

module.exports.login = async (req, res) => {
    try {
        const {email,password} = req.body;
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message:'User not found'});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid credentials'});
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'}); // Generate JWT token that expires in 1 hour
        // store this token in cookie
        delete user._doc.password;
        res.cookie('token',token,{
            httpOnly:true,
            secure:false, // Set to true if using HTTPS
            maxAge: 3600000 // 1 hour in milliseconds
        });
        delete user._doc.password; // Remove password from response
        res.send({ token, user });
    
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}


module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('token'); // Clear the cookie
        res.status(200).json({message:'User logged out successfully'});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports.profile = async (req, res) => {
    try {
        const user = req.user; // User is already set by authMiddleware
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports.toggleAvailability = async (req, res) => {
    try {
        const user = req.user; // User is already set by authMiddleware
        user.isAvailable = !user.isAvailable; // Toggle availability
        await user.save();
        res.status(200).json({message:'Availability toggled successfully',isAvailable:user.isAvailable});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports.intro = async (req, res) => {
    try {
        res.status(200).json({message:'Welcome to the Captain API'});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}