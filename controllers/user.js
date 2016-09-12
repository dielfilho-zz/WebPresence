module.exports = function(app){

	var User = app.models.user;
    var Presence = app.models.presence;

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

            Presence.checkTraineePresence(idTrainee, function(err, presences){
                console.log(err);
                console.log(presences);
                res.json({result:presences});
            });
        }


	};

	return UserController;


}