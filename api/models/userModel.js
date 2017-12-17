'use strict';


var mongoose = require('mongoose');
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


module.exports = mongoose.model('Users', UserSchema);