const http = require('http');
const app = require('./app');
const {connectDB}=require('./db/db');
const server = http.createServer(app); // Needed for WebSockets, custom behavior, more control.
const port =3000;
server.listen(port,'0.0.0.0',()=>{
    connectDB();
    console.log(`User service is running on port ${port}`);
});