'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TournamentSchema = new Schema({
    name: {
        type: String,
        Required: 'Kindly enter the name of the tournament'
    },
    country: {
        type: String,
        Required: 'Kindly enter the name of the tournament'
    },
    city: {
        type: String,
        Required: 'Kindly enter the name of the tournament'
    },
    address: {
        type: String,
    },
    minimum_number_people: {
        type: Number,
    },
    maximum_number_people: {
        type: Number,
    },
    level: {
        type: Number
    },
    start_date: {
        type: Date,
        default: Date.now
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
});


module.exports = mongoose.model('Tournaments', TournamentSchema);