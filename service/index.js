var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var AuthenticationService = require('./AuthenticationService')
var mongoose = require('mongoose');

function dbConnect() {
  mongoose.connect('mongodb://host.docker.internal:27017/paricia2', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
}

function init() {
  dbConnect();
  app.use(express.static('pub'));
  let players = {};
}

init();

io.on('connection', (socket) => {
  console.log("new connection", socket.id)
  socket.on('login', (login) => {
    var authService = new AuthenticationService();
    authService.login(login, (player) => {
      if (!player) {
        socket.emit('login bad')
      }
      else {
        players[player.username] = player;
        socket.emit('login ok', player, players);
        socket.emit('online players', players);
        socket.broadcast.emit('player joined', player)
      }
    })
  });

  socket.on('position change', (username, position, rotation) => {
    players[username].position = position;
    players[username].rotation = rotation;
    socket.broadcast.emit('position change', username, position, rotation)
  });

});

server.listen(5000, () => {
  console.log('Listening on port 5000!');
});