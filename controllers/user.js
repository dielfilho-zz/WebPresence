module.exports = function(app){

	var User = app.models.user;
    var Presence = app.models.presence;
    var Team = app.models.team;

	var UserController = {

		getAllTrainees : function(req, res){
			User.getAllTrainees(function(err, trainees){
				if(err) {
                    console.log("Err get all trainees: "+err);
                    return res.json({trainees: []});
                }
				return res.json({trainees: trainees});

			});
		},

		createAccount : function(req, res){
			var user = req.body;
			User.insert(user, function(err, user){
				if(err) {
                    console.log(err);
					return res.json({user: null});
				}
				return res.json({user: user});
			});
		},

		getTeamPresence : function(req, res){
            var idTeam = req.params.idTeam;
            var idTrainee = req.params.idTrainee;

            Presence.getTraineePresences(idTeam, idTrainee, function(err, presences){
                if(err){
                    console.log(err);
                    return res.json({result:false, data:null});
                }
                return res.json({result:true, data: presences});
            });
		},

        checkPresence : function(req, res){
            
            var idTrainee = req.body.idTrainee;
            var idTeam = req.body.idTeam;

            Presence.checkTraineePresence(idTrainee, idTeam, function(err, presence){
                if(err){
                    res.json({result: false, data:null});
                }else {
                    //The Trainee does not have te presence for today.
                    console.log("####################### PRESENCE");
                    console.log(presence.length);
                    if (presence.length == 0) {
                        var today =  new Date();
                        Team.findByIdAndDay(idTeam, today.getDay(), function(err, team){
                            console.log("####################### TEAM");
                            console.log(team);
                            if(err){
                                console.log(err);
                                res.json({result: false, data:null});
                            }else{
                                if(team){
                                    Presence.doThePresence(idTrainee, idTeam, function(err, presence){
                                        if(err){
                                            console.log(err);
                                            res.json({result: false, data:null});
                                        }else {
                                            res.json({result: true, data: presence});
                                        }
                                    });
                                }else {
                                    res.json({result: true, data: null});
                                }
                            }
                        });
                    }else{
                        res.json({result:true, data:null});
                    }
                }
            });

        }


	};

	return UserController;


}