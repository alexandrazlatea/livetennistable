'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('Users');



exports.list_all_users = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.create_an_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.read_an_user = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.update_an_user = function(req, res) {
    User.findOneAndUpdate({_id:req.params.userId}, req.body, {new: true}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};
// User.remove({}).exec(function(){});
exports.delete_an_user = function(req, res) {

    User.remove({
        _id: req.params.UserId
    }, function(err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'USer successfully deleted' });
    });
};
