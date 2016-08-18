module.exports = function(app){
	var Schema = require('mongoose').Schema;

	var team = Schema({
		date_init: {type: Date, required: true},
		date_end:  {type: Date, required: true},
		time_init: {type: String, required: true},
		time_end:  {type: String, required: true},
		trainees: [{type: Schema.Types.ObjectId, ref: 'User'}],
		check_presence: {type: Number, required: true}
	});

	team.statics.getAll = function(callback){
		this.find({}, callback);
	};

	return db.model('Team', team);

}