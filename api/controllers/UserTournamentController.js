'use strict';

var mongoose = require('mongoose'),
    UserTournament = mongoose.model('UserTournament');

exports.add_user_to_tournament = function(req, res) {
    var new_tournament = new UserTournament({userId: req.params.userId, tournamentId:req.params.tournamentId});
    new_tournament.save(function(err) {
        if (err)
            res.send(err);
        res.json({status:200});
    });
};

