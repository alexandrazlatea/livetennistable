'use strict';

var mongoose = require('mongoose'),
    Tournament = mongoose.model('UserTournament');

exports.add_user_to_tournament = function(req, res) {
    var new_tournament = new Tournament(req.params.userId, req.params.tournamentId);
    new_tournament.save(function(err, tournament) {
        if (err)
            res.send(err);
        res.json({status:200});
    });
};

