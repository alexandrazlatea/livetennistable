'use strict';


var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        Required: 'Kindly enter the name of the user'
    },
    password: {
        type: String,
        Required: 'Kindly enter the name of the user'
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    phonenumber: {
        type: String,
    },
    country: {
        type: String,
        Required: 'Kindly enter the name of the user'
    },
    city: {
        type: String,
        Required: 'Kindly enter the name of the user'
    },
    zipcode: {
        type: String,
        Required: 'Kindly enter the name of the user'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
});


var User = module.exports = mongoose.model('Users', UserSchema);
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
}