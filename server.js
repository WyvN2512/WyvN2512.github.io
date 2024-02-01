// Server-side code (server.js)
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors'); // Import the cors middleware

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Enable CORS for all routes
app.use(cors());

// Serve static files from the public directory
app.use(express.static('Public')); // Update the path to match your Glitch project structure

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for the 'moveImage' event
    socket.on('moveImage', (data) => {
        // Broadcast the 'updateImage' event to all connected clients
        io.emit('updateImage', data);
    });

    // Listen for the 'disconnect' event
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Set the server to listen on a port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
