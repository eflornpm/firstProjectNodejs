require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/listen/paxwebhook', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  req.body.receivedFromPaxWebhook = true;
  req.body.payloadFromPaxWebhook = req.body;
  io.emit('payload', req.body); // Emit the payload to all connected clients
  console.log(req.body); // Log the payload data in the server console
  res.send('Payload received successfully!'); // Send a response back to the client
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Set up Socket.IO event listeners
io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});
