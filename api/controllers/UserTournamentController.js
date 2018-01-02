'use strict';

var mongoose = require('mongoose'),

    UserTournament = mongoose.model('TournamentsUsers');

exports.add_user_to_tournament = function(req, res) {
    var new_user_tournament = new UserTournament(req.body);
    new_user_tournament.save(function(err, tournament) {
        if (err)
            res.send(err);
        res.json({status:200, tournaments:tournament});
    });
};

exports.read_user_to_tournament = function(req, res) {
    UserTournament.find({tournamentId: req.params.tournamentId, userId: req.params.userId}, function(err, UserTournaments) {
        if (err)
            res.send(err);
        res.json({status:200});
    });
};

exports.leave_user_from_tournament = function(req, res) {
    var query = {tournamentId: req.params.tournamentId, userId: req.params.userId};
    UserTournament.deleteOne({
        tournamentId: req.params.tournamentId, userId: req.params.userId
    })
    .then(function(result) {
        res.json({status:200});
    })
}

exports.get_participants = function(req, res) {
    UserTournament.getpeopleJoinedTournament(req.params.tournamentId);
};

