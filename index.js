var express = require("express");
var app = express();
var http = require("http");
var server = http.Server(app);
var io = require("socket.io")(server);
var mongoose = require("mongoose");
var authenticationService = require("./service/authenticationService")
mongoose.connect('mongodb://localhost/space', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

app.use(express.static("pub"));

io.on('connection', function(socket) {
  socket.on('login', function(login) {
    var authService = new authenticationService();
    authService.login(login, function(player){
      socket.emit('login', player);
    });
  });
});

server.listen(3000, function() {
  console.log("Listening on port 3000!");
});


