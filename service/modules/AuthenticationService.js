var Player = require("../db/schema/Player")

var AuthenticationService = function() {
    this.login = function(login, done) {
        Player.findOne({username: login.username}, function(err, player){
            if (err) throw err;
            if (!player) return done();
            player.authenticate(login.password, function(err, isMatch){
                if(err) throw err;
                if(!isMatch) done(false);
                done(player);
            });
        });
    }
}

module.exports = AuthenticationService;