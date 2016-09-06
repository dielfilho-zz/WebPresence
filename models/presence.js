module.exports = function(){

	var Schema = require('mongoose').Schema;

	var presence = Schema({
		date : {type:Date, default: Date.now},
		trainee: [{type: Schema.Types.ObjectId, ref: 'User'}],
		team: {type: Schema.Types.ObjectId, ref: 'team'},
	});


	return db.model('Presence', presence);
}