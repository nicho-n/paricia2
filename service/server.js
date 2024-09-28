var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var AuthenticationService = require('./modules/AuthenticationService')
var CommodityService = require('./modules/CommodityService')

var mongoose = require('mongoose');

var dbConnect = function () {
    return mongoose.connect('mongodb://host.docker.internal:27017/paricia2', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
}

var commodityService = new CommodityService();

var runServer = function (port = 5000, start = false) {
    let players = {};
    dbConnect();
    app.use(express.static('pub'));

    function updatePosition(username, position, rotation, players) {
        players[username].position = position;
        players[username].rotation = rotation;
        socket.broadcast.emit('position change', username, position, rotation)
    }

    io.on('connection', (socket) => {
        console.log("new connection", socket.id)
        
        socket.on('login', (playerCredentials) => {
            var authService = new AuthenticationService();
            authService.login(playerCredentials, (player) => {
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
            updatePosition(username, position, rotation, players);
        });

        socket.on('transaction', function (transaction) {
            commodityService.handle(transaction);
        });

        socket.on('chat message', function (message) {
            io.emit('message', message);
        });
    
        socket.on('player joined', function (newPlayer) {
            connectedPlayers[newPlayer.username] = newPlayer;
            clients[socket.id] = newPlayer;
            socket.broadcast.emit('player joined', newPlayer);
        });
    
        socket.on('new user', function (username) {
            io.emit('message', username + ' has joined the game.');
        });
    
    });

    return server.listen(port, () => {
        console.log(`Listening on port ${port}!`);
    });
}

var stopServer = function () {
    server.close();
}

module.exports = { runServer, dbConnect, stopServer };
