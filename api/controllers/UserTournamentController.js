'use strict';

var mongoose = require('mongoose'),
    UserTournament = mongoose.model('UserTournament');

exports.add_user_to_tournament = function(req, res) {
    var new_user_tournament = new UserTournament(req.body);
    new_user_tournament.save(function(err) {
        if (err)
            res.send(err);
        res.json({status:200});
    });
};

