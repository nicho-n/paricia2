var socket = io();

socket.on('player joined', function(newPlayer){
    if (player) {
        PlayerLoader.load(newPlayer, true);
    }
});

socket.on('online players', function(players){
   for(const other in players) {
        if (player.username != other.username) {
            PlayerLoader.load(other, true);
        }
   }
});

socket.on('position change', function(username, position, rotation){
    if (players[username]){
        players[username].position = position;
        players[username].rotation = rotation;    
    }
})

function broadcastPosition(){
    socket.emit('position change', player.username, player.position, player.rotation)
}