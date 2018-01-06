'use strict';


// alternative shortcut
var mongoose = require('mongoose'),
    User = mongoose.model('Users')




exports.add_a_score = function(req, res) {
    var new_scor = new User(req.body);
            new_scor.save(function(err, scor) {
                if (err)
                    res.send(err)
                res.json({status: 200, scor:scor.id});
            });
};

exports.read_an_user = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err)
            res.send(err);
        res.json({status: 200, user:user});
    });
};

exports.update_a_scor = function(req, res) {

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
                    text: 'We have sent you this email in response to your request to reset your password on Live Table Tennis. <br> We recommend that you keep your password and not share it with anyone. <br>Your new password id '+ new_password
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
