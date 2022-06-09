function listen(io) {
	const pongNamespace = io.of('/pong');

	let readyPlayerCount = 0;

	pongNamespace.on('connection', (socket) => {
		let room = 'room' + Math.floor(readyPlayerCount / 2);
		socket.join(room);

		socket.on('ready', (socket) => {
			console.log('Player ready', socket.id);

			readyPlayerCount++;

			if (readyPlayerCount % 2) {
				pongNamespace.in(room).emit('startGame', socket.id);
			}
		});

		socket.on('paddleMove', (paddleData) => {
			socket.to(room).emit('paddleMove', paddleData);
		});

		socket.on('ballMove', (ballData) => {
			socket.to(room).emit('ballMove', ballData);
		});

		socket.on('disconnect', (reason) => {
			console.log(`Client with ${socket.id} disconnected because ${reason}`);
			socket.leave(room);
		});
	});
}

module.exports = listen;
