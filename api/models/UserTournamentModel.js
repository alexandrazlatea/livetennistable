'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var UserTournamentSchema = new Schema({
    userId: {
        type: ObjectId,
    },
    tournamentId: {
        type: ObjectId,
    },

});


module.exports = mongoose.model('UserTournament', UserTournamentSchema);