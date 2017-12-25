'use strict';


// alternative shortcut
var mongoose = require('mongoose'),
    User = mongoose.model('Users')
var bcrypt = require('bcryptjs');



exports.list_all_users = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.create_an_user = function(req, res) {
    var new_user = new User(req.body);
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(new_user.password, salt, function(err, hash) {
            new_user.password = hash;
            new_user.save(function(err, user) {
                if (err)
                    res.send(err)


                res.json({status: 200, _id:user.id});
            });
        });
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

exports.login = function(req, res) {
    User.getUserByUsername(req.body.username, function(err, user) {
        if (err)
            res.send(err);
        if(!user){
            res.send({status: 'Unknown user'});
        }
        User.comparePassword(req.body.password, user.password, function(err, isMatch){
            if(err) res.send(err);
            if(isMatch){
                res.json({status: 'success'});
            } else {
                res.json({status: 'Pasword incorrect'});
            }
        });
    });
};
