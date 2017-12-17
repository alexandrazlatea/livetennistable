'use strict';

module.exports = function(app) {
	var todoList = require('../controllers/todoListController');
	var userList = require('../controllers/UserController');
	var tournamentList = require('../controllers/TournamentController');

	// todoList Routes
	app.route('/tasks')
		.get(todoList.list_all_tasks)
		.post(todoList.create_a_task);

	app.route('/tasks/:taskId')
		.get(todoList.read_a_task)
		.put(todoList.update_a_task)
		.delete(todoList.delete_a_task);

    app.route('/users')
        .get(userList.list_all_users)
        .post(userList.create_an_user);

    app.route('/users/:userId')
        .get(userList.read_an_user)
        .put(userList.update_an_user)
        .delete(userList.delete_an_user);

    app.route('/tournaments')
        .get(tournamentList.list_all_tournaments)
        .post(tournamentList.create_a_tournament);

    app.route('/tournaments/:tournamentId')
        .get(tournamentList.read_a_tournament)
        .put(tournamentList.update_a_tournament)
        .delete(tournamentList.delete_a_tournament);
};
