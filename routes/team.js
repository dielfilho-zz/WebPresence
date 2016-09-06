

module.exports = function(app){
	var team = app.controllers.team;

	app.get('/team', team.getAll);
	app.get('/team/trainee/:id', team.getTraineeTeams);
	app.post('/team', team.create);
}