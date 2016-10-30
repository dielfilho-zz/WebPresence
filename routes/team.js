

module.exports = function(app){
	var team = app.controllers.team;

	app.get('/team', team.getAll);
	app.get('/team/trainee/:idTrainee', team.getTraineeTeams);
	app.post('/team', team.create);
    app.get('/team/haveWorkToday/:idTeam', team.haveWorkToday);
	    
}