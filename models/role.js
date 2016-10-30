module.exports = function(app){
	
	var Schema = require('mongoose').Schema;

	var role = Schema({
		type: String
	});


	role.statics.getRoleByType = function(type, callback){
		this.findOne({type:type}).exec(callback);
	};

	return db.model('Role', role);
}