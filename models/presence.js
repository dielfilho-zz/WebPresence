module.exports = function(){

    var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	var ObjectId = mongoose.Types.ObjectId;

	var presence = Schema({
		date : {type:Date, default: Date.now},
		trainee: {type: Schema.Types.ObjectId, ref: 'User'},
		team: {type: Schema.Types.ObjectId, ref: 'team'}
	});

	presence.statics.getTraineePresences = function(idTeam, idTrainee, callback){
		idTeam = idTeam;
		idTrainee = ObjectId(idTrainee);
		this.find({'team' : idTeam, 'trainee':idTrainee}).exec(callback);
	};

    presence.statics.checkTraineePresence = function(idTrainee, idTeam, callback){
        idTrainee = ObjectId(idTrainee);
        idTeam = ObjectId(idTeam);

        var initDay = new Date();
        var endDay = new Date();

        //Setting the hours to 24 to get all presences until 00hrs
        initDay.setHours(1);
        endDay.setHours(24);

        this.find({'trainee' : idTrainee, 'team' : idTeam, 'date':{'$gt':initDay, '$lt':endDay}}).exec(callback);
    };

    presence.statics.doThePresence = function (idTrainee, idTeam, callback) {
        var _pres = new this();
        _pres.team = idTeam;
        _pres.trainee = ObjectId(idTrainee);

        return _pres.save(callback);
    };

	return db.model('Presence', presence);
};