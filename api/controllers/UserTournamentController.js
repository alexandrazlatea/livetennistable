'use strict';

var mongoose = require('mongoose'),

    UserTournament = mongoose.model('TournamentsUsers');

exports.add_user_to_tournament = function(req, res) {
    var new_user_tournament = new UserTournament(req.body);
    new_user_tournament.save(function(err, tournament) {
        if (err)
            res.send(err);
        res.json(tournament);
    });
};

exports.read_user_to_tournament = function(req, res) {
    UserTournament.find({}, function(err, UserTournaments) {
        if (err)
            res.send(err);
        res.json(UserTournaments);
    });
};

