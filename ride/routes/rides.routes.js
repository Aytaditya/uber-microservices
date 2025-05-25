const express = require('express');
const router = express.Router();

const rideController = require('../controller/rides.controller');

//const authMiddleware = require('../middleware/authMiddleware');
router.get('/', rideController.intro);

module.exports = router;