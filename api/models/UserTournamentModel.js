'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserTournamentSchema = new Schema({
    userId: {
        type: String,
    },
    tournamentId: {
        type: String,
    },

});


module.exports = mongoose.model('TournamentsUsers', UserTournamentSchema);