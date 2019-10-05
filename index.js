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
        loadShip(player, function(shipFile){
          player.ship = shipFile;
          socket.emit('login ok', player);
        })
      }
    });
  });
});

server.listen(5000, function() {
  console.log('Listening on port 5000!');
});


