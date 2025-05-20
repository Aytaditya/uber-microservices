const jwt=require('jsonwebtoken');
const captainModel=require('../models/captain.models');

module.exports.authMiddleware=async (req,res,next)=>{
    try {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);
      // Get token from cookies
        if (!token) {
            return res.status(401).json({message:'Unauthorized'});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        const user = await captainModel.findById(decoded.id); // Finding user by ID
        if (!user) {
            return res.status(401).json({message:'Unauthorized'});
        }
        req.user = user; 
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({message:'Unauthorized'});
    }
}