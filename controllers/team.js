module.exports = function(app){

	var Team = app.models.team;

	var TeamController = {

		getAll: function(req, res){
			Team.getAll(function(err, teams){
				if(err)
					return res.json({result:false});
				return res.json({result:true, data: teams});
			});
		}

	};

	return TeamController;

}