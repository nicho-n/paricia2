var mongoose = require("mongoose")
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var Player = new Schema({
    username: {type: String, unique: true, required: true, index: { unique: true }},
    password: {type: String, required: true},
    ship: {type: String, default: 'default'}
});

Player.pre('save', function(done) {
    var player = this;
    if (!player.isModified('password')) return done();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return done(err);
        bcrypt.hash(player.password, salt, function(err, hash) {
            if (err) return done(err);
            player.password = hash;
            done();
        });
    });
});

Player.methods.authenticate = function(candidatePassword, done) {
    bcrypt.compare(candidatePassword, this.password, function(err, success){
        if (err) return done(error);
        done(null, success)
    })
}

var Players = mongoose.model('Players', Player)
module.exports = Players;