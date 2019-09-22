var socket = require('socket.io-client')('http://localhost:3000')
describe('Connecting successfully and disconnecting', function () {
    it('should form a connection', function (done) {
      socket.on('connect', function() {
        expect(socket.connected).toBe(true);
        done();
      })
    });
});
