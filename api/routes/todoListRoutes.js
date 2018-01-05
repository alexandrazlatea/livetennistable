'use strict';

module.exports = function(app) {
	var userList = require('../controllers/UserController');
	var tournamentList = require('../controllers/TournamentController');
	var userTournament = require('../controllers/UserTournamentController');
	var myTournaments = require('../controllers/UserTournamentController');
	var scores = require('../controllers/ScoresController');

    app.route('/users')
        .get(userList.list_all_users)
        .post(userList.create_an_user);

    app.route('/users/:userId')
        .get(userList.read_an_user)
        .put(userList.update_an_user)
        .delete(userList.delete_an_user);

    app.route('/user/forgot-password')
        .post(userList.forgot_password);

    app.route('/login')
        .post(userList.login);

    app.route('/tournaments/:userId')
        .get(tournamentList.list_all_tournaments_based_on_userId)

    app.route('/tournaments')
        .get(tournamentList.list_all_tournaments)
    app.route('/tournaments')
        .post(tournamentList.create_a_tournament);
    app.route('/tournaments/:tournamentId')
        .put(tournamentList.update_a_tournament)
        .delete(tournamentList.delete_a_tournament);

    app.route('/tournaments/:tournamentId/:userId')
        .get(tournamentList.read_a_tournament)

    app.route('/jointournament')
        .post(userTournament.add_user_to_tournament)

    app.route('/jointournament')
        .get(userTournament.read_user_to_tournament);

    app.route('/leavetournament/:tournamentId/:userId')
        .get(userTournament.leave_user_from_tournament);
    /* app.route('/mytournaments/:userId')
         .get(myTournaments.get_my_tournaments);*/
    app.route('/getparticipants/:tournamentId')
        .get(userTournament.get_participants);

    app.route('/scores/')
        .post(scores.add_a_score);

    app.route('/scores/:scorId')
        .post(scores.update_a_score);

    app.route('/scores/:userId')
        .get(scores.get_all_tournaments);

};
