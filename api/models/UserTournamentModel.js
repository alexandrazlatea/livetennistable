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


var TournamentsUsers = module.exports = mongoose.model('TournamentsUsers', UserTournamentSchema);

module.exports.getUserTournamentsByUserId =  function(userId, tournamentId, callback){
    var query = {userId: userId, tournamentId:tournamentId};
    TournamentsUsers.find(query, callback);


}
module.exports.getpeopleJoinedTournaments =  function(tournamentId, callback){
    var query = {tournamentId:tournamentId};
    TournamentsUsers.find(query).count(function (error, count) {
        return callback(error, count);
    });
}