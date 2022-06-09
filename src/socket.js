function listen(io) {
	let readyPlayerCount = 0;

	io.on('connection', (socket) => {
		console.log('a user connected', socket.id);

		socket.on('ready', (socket) => {
			console.log('Player ready', socket.id);

			readyPlayerCount++;

			if (readyPlayerCount % 2) {
				socket.emit('startGame', socket.id);
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
