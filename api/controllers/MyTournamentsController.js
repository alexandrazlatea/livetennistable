'use strict';

var mongoose = require('mongoose'),
    Tournament = mongoose.model('Tournaments'),
    TournamentsUsers = mongoose.model('myTournamentsUsers');



exports.get_my_tournaments = function(req, res) {
    Tournament.find({userId: req.params}, function(err, Tournament) {
        if (err)
            res.send(err);
        var userId = req.params.userId;
        var tempArray = [];
        Tournament.forEach(function(item, index) {
            TournamentsUsers.getUserTournamentsByUserId(userId, item.id, function(err, usertournament){

                if ((Object.keys(usertournament).length) > 0) {
                    tempArray.push(Tournament[index]);
                }
                if (index === Tournament.length - 1) {
                    exports.functionAfterForEach(req, res, tempArray);
                }
            });
        });

    });
};

exports.functionAfterForEach = function(req, res,Tournament) {

    res.json({status:200, tournaments: Tournament});
}

