

module.exports = function(app){
	var trainee = app.controllers.user;

	app.get('/trainee', trainee.getAllTrainees);
	app.get('/trainee/presence/:idTeam/:idTrainee', trainee.getTeamPresence);
    app.post('/trainee/presence', trainee.checkPresence);
	app.post('/trainee', trainee.createAccount);

}