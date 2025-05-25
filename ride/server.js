const http = require('http');
const app = require('./app');
const {connectDB} = require('./db/db');

const server=http.createServer(app);

server.listen(3000,'0.0.0.0',() => {
    connectDB();
    console.log('Ride service is running on port 3003');
})