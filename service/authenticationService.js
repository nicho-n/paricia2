var Player = require("../db/models/Player")
var LoginService = function() {
    this.login = function(login, done) {
        Player.findOne({username: login.username}, function(err, player){
            if (err) throw err;
            if (!player) return done();
            player.authenticate(login.password, function(err, isMatch){
                if(err) throw err;
                done(player);
            });
        });
    }
}
module.exports = LoginService;