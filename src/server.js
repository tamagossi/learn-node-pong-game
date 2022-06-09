const api = require('./api');

const server = require('http').createServer(api);
const PORT = 3000;
const socket = require('./socket');

const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

server.listen(PORT);
console.log(`--- ✅ Run and listening to port ${PORT}`);

socket(io);
