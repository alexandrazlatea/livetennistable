var express = require('express'),
  app = express(),
  port = process.env.PORT || 3045,
  mongoose = require('mongoose'),
  User = require('./api/models/userModel'),
  Tournament = require('./api/models/tournamentModel'),
  UserTournament = require('./api/models/UserTournamentModel'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:Test123456@ds131137.mlab.com:31137/livetabletennis');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
