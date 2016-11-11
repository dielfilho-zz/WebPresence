module.exports = function(app){

	var User = app.models.user;
    var Presence = app.models.presence;
    var Team = app.models.team;

    var checkPreseceIsValid = function(presence, team){
        
        var avg = getPresencesAverage(presence, team);
        var isPresenceValid = false;
        if(team.percent <= avg){
            //Telling that this presence is valid
            isPresenceValid = true;
        }
        
        return isPresenceValid;
    }

    var getPresencesAverage = function(presence, team){
        //Doing the average of all percents.
        var sum = 0;
        var avg = 0;

        presence.percents.forEach(function(perc){
            sum += perc;
        });

        avg = sum / presence.percents.length;

        console.log("SUM : --------->  "+sum+" ------> "+presence.percents.length);

        console.log("AVG : --------->  "+avg);

        return avg;

    };

    var isLastCheck = function(presence, team){

        var today = new Date();

        //Getting the numbers of check presences at today.
        var day = team.days.filter(function(day){
            return day.date.id == today.getDay();
        })[0];
        if(presence.checks >= day.check_presence.length){
            return true;
        }   
        return false;
    }

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
					return res.json({result:false, data: null});
				}
				return res.json({result: true, data: user});
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
                    //The Trainee does not have the presence for today.
                    if (presence.length == 0) {
                        var today =  new Date();
                        Team.findByIdAndDay(idTeam, today.getDay(), function(err, team){
                            if(err){
                                console.log(err);
                                res.json({result: false, data:null});
                            }else{
                                if(team){
                                    Presence.doThePresence(idTrainee, idTeam, 0, function(err, presence){
                                        if(err){
                                            console.log(err);
                                            res.json({result: false, data:null});
                                        }else {
                                            res.json({result: true, data: presence});
                                        }
                                    });
                                }else {
                                    res.json({result: false, data: null});
                                }
                            }
                        });
                    }else{
                        res.json({result:true, data:null});
                    }
                }
            });

        },

        checkPresenceDevice : function(req, res){
            var idTeam = req.body.idTeam;
            var idTrainee = req.body.idTrainee;
            var percent = req.body.percent;
            console.log(req.body);

            Presence.checkTraineePresence(idTrainee, idTeam, function(err, presence){
                if(err){
                    console.log(err);
                    res.json({result: false, data:null});
                }else{
                    var today =  new Date();
                    Team.findByIdAndDay(idTeam, today.getDay(), function(err, team){
                        if(err){
                            console.log(err);
                            res.json({result: false, data:null});
                        }else {
                            if (team) {
                                console.log("TEAM: ");
                                console.log(team);
                                if (presence) {
                                    console.log("Presence: ");
                                    console.log(presence);
                                    //Incrementing the checks amount.
                                    presence.checks += 1;
                                    presence.lastCheck = isLastCheck(presence, team);
                                    
                                    //Increment the checks and insert the new percent
                                    presence.percents.push(percent);
                                    
                                    if (presence.lastCheck) {
                                        var avg = getPresencesAverage(presence, team);
                                        
                                        Presence.update(presence._id, presence.checks, presence.percents, avg, checkPreseceIsValid(presence, team), function (err, presence) {
                                            if (err) {
                                                console.log(err);
                                                res.json({result: false, data: null});
                                            } else {
                                                presence.lastCheck = true;
                                                res.json({result: true, data: presence});
                                            }
                                        });


                                    } else {
                                        Presence.update(presence._id, presence.checks, presence.percents, 0, false, function (err, presence) {
                                            if (err) {
                                                console.log(err);
                                                res.json({result: false, data: null});
                                            } else {
                                                res.json({result: true, data: presence});
                                            }
                                        });
                                    }
                                } else {
                                    console.log("SAVING THE FIRST PRESENCE!!");
                                    Presence.doThePresence(idTrainee, idTeam, [percent], function (err, presence) {
                                        if (err) {
                                            console.log(err);
                                            res.json({result: false, data: null});
                                        } else {
                                            presence.valid = checkPreseceIsValid(presence, team);
                                            presence.lastCheck = isLastCheck(presence, team);
                                            res.json({result: true, data: presence});
                                        }
                                    });
                                }
                            } else {
                                console.log("THIS TEAM DOES NOT EXISTS");
                                res.json({result: false, data: null});
                            }
                        }
                    });
                }
            });
            
        }


	};

	return UserController;


}