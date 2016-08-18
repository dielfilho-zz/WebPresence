module.exports = function(app){
	
	var Schema = require('mongoose').Schema;

	var role = Schema({
		type: String
	});

	return db.model('Role', role);
}