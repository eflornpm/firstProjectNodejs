const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/newpage', function(req, res) {
    const dataistr = req.query.data;
    io.emit('chatmessage',`${timeStampHS()}: Data received= ${dataistr}`);
    res.send('PageLoaded!');
  });
  

io.on('connection', function(socket) {
  console.log(`New user connected: ${socket.id}`);

  socket.on('disconnect', function() {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on('chatmessage', function(msg) {
    console.log('message: ' + msg);
    io.emit('chatmessage', `[<b>${timeStampHS()}</b>]: ${msg}`);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

function timeStampHS(){
    let newitimestap = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
    return newitimestap;
}
