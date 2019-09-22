var mongoose = require("mongoose")
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var Player = new Schema({
    username: {type: String, unique: true, required: true, index: { unique: true }},
    password: {type: String, required: true}
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

var Players = mongoose.model('Players', Player)
module.exports = Players;