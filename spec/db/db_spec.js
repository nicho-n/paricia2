//var mongoose = require('../db/mongoose');
var mongoose = require("mongoose");
var Player = require("../../service/db/schema/Player")
var { runServer, dbConnect } = require("../../service/server");

describe('game database', function () {
    beforeEach(() => {
        dbConnect();
    })
    it('creates a user', function (done) {
        var testPlayer = new Player({ username: 'testUser', password: 'password' });
        testPlayer.save(function (player) {
            expect(player).not.toBeNull();
            done();
        });
    });
});
