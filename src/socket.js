function listen(io) {
	const pongNamespace = io.of('/pong');

	let readyPlayerCount = 0;

	pongNamespace.on('connection', (socket) => {
		console.log('a user connected', socket.id);

		socket.on('ready', (socket) => {
			console.log('Player ready', socket.id);

			readyPlayerCount++;

			if (readyPlayerCount % 2) {
				pongNamespace.emit('startGame', socket.id);
			}
		});

		socket.on('paddleMove', (paddleData) => {
			socket.broadcast.emit('paddleMove', paddleData);
		});

		socket.on('ballMove', (ballData) => {
			socket.broadcast.emit('ballMove', ballData);
		});

		socket.on('disconnect', (reason) => {
			console.log(`Client with ${socket.id} disconnected because ${reason}`);
		});
	});
}

module.exports = listen;
