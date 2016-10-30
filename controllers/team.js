module.exports = function(app){

	var Team = app.models.team;
    var Day = app.models.day;
    var async = require('async');

    var strToDate = function (dateStr) {
        var parts = dateStr.split("/");
        return new Date(parts[2], parts[1] - 1, parts[0]);
    };


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
                //Formatting the datas to yyyy/MM/dd
                console.log(team.date_init);
                console.log(team.date_end);

                team.date_init = strToDate(team.date_init);
                team.date_end = strToDate(team.date_end);

                Team.create(team, trainees, days, function(err, team){
                    if(err) {
                        console.log(err);
                        return res.json({result: false});
                    }
                    return res.json({result: true, data: team});

                });
            });

		},
        
        getTraineeTeams: function (req, res) {
            var _idTrainee = req.params.idTrainee;
            Team.getTraineeTeams(_idTrainee, function(err, teams){
                if(err) {
                    console.log(err);
                    return res.json({result: false});
                }
                return res.json({result: true, data: teams});
            });
        },


        //This function return true if the team works at today, false otherwise.
        haveWorkToday : function(req, res){
            var idTeam = req.params.idTeam;
            var today =  new Date();
            
            Team.findByIdAndDay(idTeam, today.getDay(), function(err, team){
                if(err){
                    console.log(err);
                    res.json({result:false});
                }else{
                    if(team){
                        res.json({result:true});
                    }else{
                        res.json({result:false});
                    }
                }
            });

        },
	};

	return TeamController;

}