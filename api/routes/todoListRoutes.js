'use strict';

module.exports = function(app) {
	var userList = require('../controllers/UserController');
	var tournamentList = require('../controllers/TournamentController');
	var userTournament = require('../controllers/UserTournamentController');

    app.route('/users')
        .get(userList.list_all_users)
        .post(userList.create_an_user);

    app.route('/users/:userId')
        .get(userList.read_an_user)
        .put(userList.update_an_user)
        .delete(userList.delete_an_user);

    app.route('/login')
        .post(userList.login);

    app.route('/tournaments')
        .get(tournamentList.list_all_tournaments)
        .post(tournamentList.create_a_tournament);

    app.route('/tournaments/:tournamentId')
        .get(tournamentList.read_a_tournament)
        .put(tournamentList.update_a_tournament)
        .delete(tournamentList.delete_a_tournament);

    app.route('/jointournament')
		.post(userTournament.add_user_to_tournament);
};
