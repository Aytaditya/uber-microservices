const jwt=require('jsonwebtoken');
const userModel=require('../models/user.models');

module.exports.authMiddleware=async (req,res,next)=>{
    try {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);
      // Get token from cookies
        if (!token) {
            return res.status(401).json({message:'Unauthorized'});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        const user = await userModel.findById(decoded.id); // Finding user by ID
        if (!user) {
            return res.status(401).json({message:'Unauthorized'});
        }
        req.user = user; // this will make sure avoids querying the database again — you already have the user available.
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({message:'Unauthorized'});
    }
}