var socket = io();

function login() {
    var username = document.getElementById("username-prompt").value;
    var password = document.getElementById("password-prompt").value;
    socket.emit('login', {"username": username, "password": password});
}
