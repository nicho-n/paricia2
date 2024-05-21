//var mongoose = require('../db/mongoose');
var mongoose = require("mongoose");
var Player = require("../../service/db/schema/Player")
mongoose.connect('mongodb://host.docker.internal:27017/paricia2', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
mongoose.set('useCreateIndex', true);

describe('game database', function() { 
    it('creates a user', function(done) {

        var testPlayer = new Player({username: 'testUser', password: 'password'});    

        testPlayer.save(function(player) {
            expect(player).not.toBeNull();
            done();
        });
    });

})