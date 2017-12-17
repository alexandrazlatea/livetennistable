'use strict';

var mongoose = require('mongoose'),
    Tournament = mongoose.model('Tournaments');



exports.list_all_tournaments = function(req, res) {
    Tournament.find({}, function(err, Tournament) {
        if (err)
            res.send(err);
        res.json(Tournament);
    });
};


exports.create_a_tournament = function(req, res) {
    var new_tournament = new Tournament(req.body);
    new_tournament.save(function(err, tournament) {
        if (err)
            res.send(err);
        res.json(tournament);
    });
};

exports.read_a_tournament = function(req, res) {
    Tournament.findById(req.params.tournamentId, function(err, tournament) {
        if (err)
            res.send(err);
        res.json(tournament);
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