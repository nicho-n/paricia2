//var mongoose = require('../db/mongoose');
var mongoose = require("mongoose");
var Player = require("../../db/models/Player")
mongoose.connect('mongodb://localhost/space', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

describe('game database', function() { 

    it('creates a user', function(done) {

        var testPlayer = new Player({username: 'testUser', password: 'password'});    

        testPlayer.save(function(err, player) {
            if (err) throw err;
            expect(player).not.toBeNull();
            done();
        });
    });

})