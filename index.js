var express = require("express");
var app = express();
var http = require("http");
var server = http.Server(app);
var io = require("socket.io")(server);

app.use(express.static("pub"));

io.on('connection', function(socket) {
  socket.on('login', function(login) {
    io.emit('login', login);
  })
});

server.listen(3000, function() {
  console.log("Listening on port 3000!");
});
