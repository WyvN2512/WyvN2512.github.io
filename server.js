console.log('Server is starting...');

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('moveImage', (data) => {
        // Broadcast the new position to all connected clients, including the sender
        io.sockets.emit('updateImage', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
