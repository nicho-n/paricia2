var io = require('socket.io-client')
var fs = require('fs');
describe('Game Server', function () {
    let socket;

    beforeEach(function() {
      socket = io.connect('http://localhost:5000', {'force new connection': true});
    });

    it('should form a connection', function (done) {
      socket.on('connect', function() {
        expect(socket.connected).toBe(true);
        done();
      });
    });

    it('should log in a player', function(done) {
      socket.emit('login', {username: 'testUser', password: "password"});
      socket.on('login ok', function(player){
        expect(player.username).toEqual('testUser');
        done();
      });
    });

    it('should load a player', function(done) {
      socket.emit('login', {username: 'testUser', password: "password"});
      socket.on('login ok', function(player){
        expect(player.username).toEqual('testUser');
        fs.readFile('./assets/spaceship.obj', 'utf8', function(err, fileContents){
          expect(fileContents).toEqual(player.ship);
          done();
        });
      });

    })

    it('should not log in a player with incorrect password', function(done) {
      socket.emit('login', {username: 'testUer', password: "passwor"});
      socket.on('login bad', function(player){
        expect(player).toBeUndefined();
        done();
      });
    });
});
