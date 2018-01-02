'use strict';


// alternative shortcut
var mongoose = require('mongoose'),
    User = mongoose.model('Users')
var bcrypt = require('bcryptjs');

var nodemailer = require('nodemailer');


exports.list_all_users = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json({status:200, user:user});
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
        res.json({status: 200, user:user});
    });
};

exports.update_an_user = function(req, res) {
    User.findOneAndUpdate({_id:req.params.userId}, req.body, {new: true}, function(err, user) {
        if (err)
            res.send(err);
        res.json({status:200, user:user});
    });
};
// User.remove({}).exec(function(){});
exports.delete_an_user = function(req, res) {

    User.deleteOne({
        _id: req.params.UserId
    }, function(err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted' });
    });
};

exports.login = function(req, res) {
    User.getUserByUsername(req.body.username, function(err, user) {
        if (err)
            res.send(err);
        if(!user){
            res.send({status: 210});
        }
        User.comparePassword(req.body.password, user.password, function(err, isMatch){
            if(err) res.send(err);
            if(isMatch){
                res.json({status: 200, _id:user.id, firstName:user.firstName, lastName:user.lastName});
            } else {
                res.json({status: 210});
            }
        });
    });
};

exports.forgot_password = function(req, res) {
    User.getUserByUsername(req.body.username, function(err, user) {
        if (err)
            res.send(err);
        if(!user){
            res.send({status: 210});
        } else {

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'zlatea.alexandra@gmail.com',
                    pass: 'mlacif12'
                }
            });
            var new_password = Math.random().toString(36).slice(-8);
            user.password = new_password;
            User.findOneAndUpdate({_id:user.id}, user, {new: true}, function(err, user) {
                if (err)
                    res.send(err);
                var mailOptions = {
                    from: 'zlatea.alexandra@gmail.com',
                    to: user.email,
                    subject: 'Reset password',
                    text: 'That was easy!'
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        res.json({status:200});

                    }
                });
            });
        }

    });

};
