var io = require('socket.io-client')
describe('Game Server', function () {
    let socket;

    beforeEach(function() {
      socket = io.connect('http://localhost:3000', {'force new connection': true});
    });

    it('should form a connection', function (done) {
      socket.on('connect', function() {
        expect(socket.connected).toBe(true);
        done();
      });
    });

    it('should log in a player', function(done) {
      socket.emit('login', {username: 'testUser', password: "password"});
      socket.on('login', function(player){
        expect(player.username).toEqual('testUser');
        expect(player.ship).toEqual('default');
        done();
      });
    });

    it('should not log in a player with incorrect password', function(done) {
      socket.emit('login', {username: 'testUer', password: "passwor"});
      socket.on('login', function(player){
        expect(player).toBeNull();
        done();
      });

    });
});
