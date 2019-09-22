var express = require("express");
var app = express();
var http = require("http");
var server = http.Server(app);
var socketio = require("socket.io");
var io = socketio(server);

app.use(express.static("pub"));

io.on('connection', function(socket) {

});

server.listen(3000, function() {
  console.log("Listening on port 3000!");
});
