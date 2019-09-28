var express = require("express");
var app = express();
var http = require("http");
var server = http.Server(app);
var io = require("socket.io")(server);
var AuthenticationService = require("./service/AuthenticationService")
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/space', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

app.use(express.static("pub"));

io.on('connection', function(socket) {
  socket.on('login', function(login) {
    console.log(login);
    var authService = new AuthenticationService();
    authService.login(login, function(player){
      if (player == null) {
        socket.emit('login bad')
      }
      else {
        socket.emit('login ok', player);
      }
    });
  });
});

server.listen(5000, function() {
  console.log("Listening on port 5000!");
});


