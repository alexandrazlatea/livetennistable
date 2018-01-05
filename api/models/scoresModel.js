'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = mongoose.model('Users');
var ScoresSchema = new Schema({
    userA: {
        type: String,
    },
    userB: {
        type: String,
    },
    scorA: {
        type: Number,
    },
    scorB: {
        type: Number,
    },
    tournamentId: {
        type:  String,
    },
});


var Scores = module.exports = mongoose.model('ScoresSchema', ScoresSchema);


