require('dotenv').config();  // Ensure environment variables are loaded
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const tradeRoutes = require('./routes/tradeRoutes');
const cargoRoutes = require('./routes/cargoRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const { kafkaConsumer } = require('./config/kafka');
const cors = require('cors');

// Initialize app and HTTP server
const app = express();
const server = http.createServer(app); // API + WebSocket on same server
const io = new Server(server);  // Socket.IO server

// Middleware
app.use(cors());  // Enable CORS for all requests
app.use(express.json()); // Enable parsing of JSON requests
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// API Routes (for Postman)
app.use(tradeRoutes);
app.use(cargoRoutes);
app.use(inventoryRoutes);

// Socket.IO event handler
io.on('connection', (socket) => {
    console.log('Client connected via Socket.IO');

    // Send Kafka messages to the client
    kafkaConsumer.on('message', (message) => {
        console.log('Kafka message:', message.value);
        socket.emit('kafka-event', message.value);  // Emit event to Socket.IO client
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected from Socket.IO');
    });
});

// Start HTTP server (for both API and WebSocket)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Start Kafka event processor (optional)
require('./services/eventProcessor');

