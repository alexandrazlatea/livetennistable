'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var UserTournamentSchema = new Schema({
    userId: {
        type: String,
    },
    tournamentId: {
        type: String,
    },

});


module.exports = mongoose.model('UserTournament', UserTournamentSchema);