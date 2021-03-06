'use strict';

var mongoose = require('mongoose'),
    Tournament = mongoose.model('Tournaments'),
    TournamentsUsers = mongoose.model('TournamentsUsers');



exports.list_all_tournaments_based_on_userId = function(req, res) {
    Tournament.find({}, function(err, Tournament) {
        if (err)
            res.send(err);
        var userId = req.params.userId;
        if (Tournament.length > 0) {
            Tournament.forEach(function (item, index) {
                TournamentsUsers.getUserTournamentsByUserId(userId, item.id, function (err, usertournament) {
                    if ((Object.keys(usertournament).length) > 0) {
                        Tournament[index].userIsJoined = true;
                    }
                    TournamentsUsers.getpeopleJoinedTournaments(item.id, function (err, countPeople) {
                        Tournament[index].peoplesJoined = countPeople;
                        if (index === Tournament.length - 1) {
                            exports.functionAfterForEach(req, res, Tournament);
                        }
                    });

                });

            });
        }
    });
};

exports.list_all_tournaments = function(req, res) {
    var counter = 0;
    Tournament.find({}, function(err, Tournament) {
        if (err)
            res.send(err);
        if (Tournament.length > 0) {
            Tournament.forEach(function (item, index) {
                    TournamentsUsers.getpeopleJoinedTournaments(item.id, function (err, countPeople) {
                        Tournament[counter].peoplesJoined = countPeople;
                        if (counter === Tournament.length - 1) {
                            exports.functionAfterForEach(req, res, Tournament);
                        }
                        counter++;
                    });

            });
        }
    });
};

exports.functionAfterForEach = function(req, res,Tournament) {

    res.json({status:200, tournaments: Tournament});
}

exports.create_a_tournament = function(req, res) {
    var new_tournament = new Tournament(req.body);
    new_tournament.save(function(err, tournament) {
        if (err)
            res.send(err);
        res.json({status:200});
    });
};

exports.read_a_tournament = function(req, res) {
    Tournament.findById(req.params.tournamentId, function(err, tournament) {

        if (err)
            res.send(err);
        TournamentsUsers.getUserTournamentsByUserId(req.params.userId, req.params.tournamentId, function(err, usertournament){
            if ((Object.keys(usertournament).length)>0) {
                tournament.userIsJoined = true;
            }
            TournamentsUsers.getpeopleJoinedTournaments(req.params.tournamentId, function (err, countPeople) {
                tournament.peoplesJoined = countPeople;
                if (index === tournament.length - 1) {
                    exports.functionAfterForEach(req, res, tournament);
                }

            });



        });
    });
};

exports.update_a_tournament = function(req, res) {
    Tournament.findOneAndUpdate({_id:req.params.tournamentId}, req.body, {new: true}, function(err, tournament) {
        if (err)
            res.send(err);
        res.json(tournament);
    });
};
// Tournament.remove({}).exec(function(){});
exports.delete_a_tournament = function(req, res) {

    Tournament.deleteOne({
        _id: req.params.tournamentId
    })
        .then(function(result) {
            res.json({status:200});
        })

};
