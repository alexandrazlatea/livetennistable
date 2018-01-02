'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = mongoose.model('Users');
var UserTournamentSchema = new Schema({
    userId: {
        type: String,
    },
    tournamentId: {
        type:  String,
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

module.exports.getpeopleJoinedTournament =  function(tournamentId, callback) {
    console.log(tournamentId);
    var query = {tournamentId: tournamentId};
     TournamentsUsers.find(query, function(err, result) {
         result.forEach(function (tournament, index) {
             Users.find({userId: tournament.userId}, function(error, user){
                 console.log(user);
                console.log(user.username);
            })
        });    });

}
