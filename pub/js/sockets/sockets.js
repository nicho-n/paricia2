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
        players[username].obj.position.copy(position);
        players[username].rotation = rotation;    
    }
});

socket.on('login ok', function(player) {
    PlayerLoader.load(player, false);
    loginWindow.remove();
});

socket.on('login bad', function() {
    console.log("bad!!")
});

function broadcastPosition(){
    socket.emit('position change', player.username, player.position, player.rotation)
}