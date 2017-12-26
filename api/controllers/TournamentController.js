'use strict';

var mongoose = require('mongoose'),
    Tournament = mongoose.model('Tournaments'),
    TournamentsUsers = mongoose.model('TournamentsUsers');



exports.list_all_tournaments = function(req, res) {
    Tournament.find({}, function(err, Tournament) {
        if (err)
            res.send(err);
        var userId = req.params.userId;
        Tournament.forEach(function(item, index) {
            TournamentsUsers.getUserTournamentsByUserId(userId, item.id, function(err, usertournament){
                if ((Object.keys(usertournament).length)>0) {
                    Tournament[index].userIsJoined = true;
                }
                if (index === Tournament.length - 1) {
                    exports.functionAfterForEach(req, res, Tournament);
                }
            });
            TournamentsUsers.getpeopleJoinedTournaments(item.id,function(err, countPeople){
                Tournament[index].peoplesJoined = countPeople;
            });
        });

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
        res.json({status:200, tournaments: tournament});
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

    Tournament.remove({
        _id: req.params.TournamentId
    }, function(err, tournament) {
        if (err)
            res.send(err);
        res.json({ message: 'tournament successfully deleted' });
    });
};
