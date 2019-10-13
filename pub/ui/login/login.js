import {PlayerLoader} from "../../3d/player/PlayerLoader.js"
var socket = io();

export function connect() {
    var username = document.getElementById("username-prompt").value;
    var password = document.getElementById("password-prompt").value;
    socket.emit('login', {"username": username, "password": password});
}

socket.on('login ok', function(player) {
    PlayerLoader.load(player);
})

socket.on('login bad', function() {
    console.log("bad!!")
});
