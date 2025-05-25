const express=require('express');
const dotenv = require('dotenv');
dotenv.config();
const userRoutes = require('./routes/rides.routes');
const cookieParser = require('cookie-parser');
const app=express();
app.use(express.json()); // Middleware to parse JSON request body
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.urlencoded({extended:true})); // only required if frontend is html form

app.use('/',userRoutes)


module.exports=app;