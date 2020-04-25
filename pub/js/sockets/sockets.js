var socket = io();

socket.on('player joined', function(newPlayer){
    if (player) {
        PlayerLoader.load(newPlayer);
        console.log("adding join socket")    
    }
});

socket.on('online players', function(players){
   for(const other in players) {
        if (player.username != other.username) {
            console.log("adding online players")
            PlayerLoader.load(other, true);
        }
   }
});

socket.on('position change', function(username, position, rotation){
    players[username].position = position;
    players[username].rotation = rotation;
})

function broadcastPosition(){
    socket.emit('position change', player.username, player.position, player.rotation)
}