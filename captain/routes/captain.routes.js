const express=require('express');
const router=express.Router();
const userController=require('../controller/captain.controller');
const authMiddleware=require('../middleware/authMiddleware');

router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/logout',userController.logout);
router.get('/profile',authMiddleware.authMiddleware,userController.profile);
router.patch('/toggle-availability',authMiddleware.authMiddleware,userController.toggleAvailability);

module.exports=router;