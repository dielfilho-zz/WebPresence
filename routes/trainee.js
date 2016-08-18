

module.exports = function(app){
	var trainee = app.controllers.user;

	app.get('/trainee', trainee.getAllTrainees);
	app.post('/trainee', trainee.createAccount);
}