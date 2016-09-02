module.exports = function(app){

	var Team = app.models.team;
    var Day = app.models.day;
    var async = require('async');

	var TeamController = {

		getAll: function(req, res){
			Team.getAll(function(err, teams){
				if(err)
					return res.json({result:false});
				return res.json({result:true , data: teams});
			});
		},

		create: function (req, res) {
            var team = req.body;

            var trainees = [];

            team.trainees.forEach(function(trainee){
                trainees.push(trainee._id);
            });

            var days = [];

            async.forEach(team.days, function(day, callback){
                Day.create(day, function(err, day){
                    if(err) {
                        console.log(err);
                    }else {
                        days.push(day._id);
                    }
                    callback();
                });
            }, function() {
                Team.create(team, trainees, days, function(err, team){
                    console.log(err);
                    console.log(team);
                    if(err) {
                        console.log(err);
                        return res.json({result: false});
                    }
                    return res.json({result: true, data: team});

                });
            });

		}


	};

	return TeamController;

}