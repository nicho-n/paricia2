var io = require('socket.io-client')
describe('Game Server', function () {
    let socket;

    beforeEach(function() {
      socket = io.connect('http://localhost:3000', {'force new connection': true});
    })

    it('should form a connection', function (done) {
      socket.on('connect', function() {
        expect(socket.connected).toBe(true);
        done();
      })
    });

    it('should log in a player', function(done) {
      socket.emit('login', {name: 'testUser'});
      socket.on('login', function(player){
        expect(player.name).toEqual('testUser');
        expect(player.ship.name).toEqual('default');
        done();
      })
    });
});
