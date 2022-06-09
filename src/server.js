const io = require('socket.io');
const hhtp = require('http');

const api = require('./api');
const socket = require('./socket');

const httpServer = http.createServer(api);
const socketServer = io(httpServer);

const PORT = 3000;
httpServer.listen(PORT);
console.log(`--- ✅ Run and listening to port ${PORT}`);

socket(socketServer);
