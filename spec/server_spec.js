var io = require('socket.io-client')
describe('Connecting successfully and disconnecting', function () {
    var socket;

    beforeEach(function() {
      socket = io.connect('http://localhost:3000',
        {'force new connection': true}
      );
    })

    it('should form a connection', function (done) {
      socket.on('connect', function() {
        expect(socket.connected).toBe(true);
        done();
      })
    });
});
