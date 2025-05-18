const dotenv = require('dotenv');
dotenv.config();
const express =require('express');
const app = express();
const userRoutes = require('./routes/user.routes.js');
const cookieParser = require('cookie-parser');

app.use(express.json()); // Middleware to parse JSON request body
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.urlencoded({extended:true})); // only required if frontend is html form

app.use('/',userRoutes)

module.exports = app;