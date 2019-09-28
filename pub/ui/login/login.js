var socket = io();

function connect(){
    var username = document.getElementById("username-prompt").value;
    var password = document.getElementById("password-prompt").value;
	socket.emit('login', {"username": username, "password": password});
}

socket.on('login ok', function(player) {
    console.log("good!")
});

socket.on('login bad', function() {
    console.log("bad!!")
});

