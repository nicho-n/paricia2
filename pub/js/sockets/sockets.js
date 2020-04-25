var socket = io();

socket.on('player joined', function(player){
    PlayerLoader.load(player);
});

socket.on('online players', function(players){
   for(const player in players) {
       PlayerLoader.load(player);
   }
});

socket.on('position change', function(username, position, rotation){
    players[username].position = position;
    players[username].rotation = rotation;
})

function broadcastPosition(){
    socket.emit('position change', player.username, player.position, player.rotation)
}