const http = require('http');
const app = require('./app');
const {connectDB}=require('./db/db');
const server = http.createServer(app); // Needed for WebSockets, custom behavior, more control.

server.listen(3001,()=>{
    connectDB();
    console.log('User service is running on port 3001');
});