var socket = io();

function login() {
    var username = document.getElementById("username-prompt").value;
    var password = document.getElementById("password-prompt").value;
    socket.emit('login', {"username": username, "password": password});
}
socket.on('login ok', function(player) {
    parent.PlayerLoader.load(player, false);
    parent.loginWindow.remove();
});

socket.on('login bad', function() {
    console.log("bad!!")
});
