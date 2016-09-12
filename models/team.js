module.exports = function(app){

    var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
    var ObjectId = mongoose.Types.ObjectId;

	var team = Schema({
		date_init: {type: Date, required: true},
		date_end:  {type: Date, required: true},
		trainees: [{type: Schema.Types.ObjectId, ref: 'User'}],
		days: [{type: Schema.Types.ObjectId, ref: 'Day'}],
        mac_ap : {type: String, required: true},
        name: {type: String}
	});

	team.statics.getAll = function(callback){
		this.find({}).populate('days').populate('trainees').exec(callback);
	};

    team.statics.getTraineeTeams = function (_idTrainee, callback) {
        this.find({'trainees' : _idTrainee}).populate('days').populate('trainees').exec(callback);
    };

	team.statics.create = function(team, trainees, days, callback){
        var _team = new this();
        _team.date_init = team.date_init;
        _team.date_end = team.date_end;
        _team.trainees = [];
        _team.days = days;
        _team.mac_ap = team.mac_ap;
        _team.name = team.name;

        trainees.forEach(function(_idTrainee){
            _team.trainees.push(ObjectId(_idTrainee));
        });

        _team.save(callback);

    };

	return db.model('Team', team);

}