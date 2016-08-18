

module.exports = function(app){
	var team = app.controllers.team;

	app.get('/team', team.getAll);
}