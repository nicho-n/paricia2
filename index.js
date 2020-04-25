var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var AuthenticationService = require('./service/AuthenticationService')
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/space', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

app.use(express.static('pub'));

var players = {}

function loadShip(player, done){
  if (player.ship == 'default'){
    fs.readFile('./assets/spaceship.obj', 'utf8', function(err, fileContents) {
      if (err) {
        done(err);
      }
      if (fileContents) {
        done(fileContents);
      }
  });
  }
}

io.on('connection', function(socket) {
  socket.on('login', function(login) {
    var authService = new AuthenticationService();
    authService.login(login, function(player){
      if (!player) {
        socket.emit('login bad')
      }
      else {
        loadShip(player, function(shipFile) {
          player.ship = shipFile;
          socket.emit('login ok', player);
          socket.emit('online players', players)
          socket.broadcast.emit('player joined', player)
          players[player.username] = player;
        })
      }
    });
  });
  
  socket.on('position change', function(username, position, rotation){
    players[username].position = position;
    players[username].rotation = rotation;
    socket.broadcast.emit('position change', username, position, rotation)
  })

});

server.listen(5000, function() {
  console.log('Listening on port 5000!');
});


