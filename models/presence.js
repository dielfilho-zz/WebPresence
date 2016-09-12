module.exports = function(){

    var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	var ObjectId = mongoose.Types.ObjectId;

	var presence = Schema({
		date : {type:Date, default: Date.now},
		trainee: [{type: Schema.Types.ObjectId, ref: 'User'}],
		team: {type: Schema.Types.ObjectId, ref: 'team'}
	});

	presence.statics.getTraineePresences = function(idTeam, idTrainee, callback){
		idTeam = ObjectId(idTeam);
		idTrainee = ObjectId(idTrainee);
		this.find({'trainee' : idTrainee, 'team' : idTeam}).populate('team').populate('team.days').exec(callback);
	};

    presence.statics.checkTraineePresence = function(idTrainee, callback){
        idTrainee = ObjectId(idTrainee);
        this.find({'trainee' : idTrainee}).populate('team').populate('team.days').exec(callback);
    };

	return db.model('Presence', presence);
};