module.exports = function(app){

	var User = app.models.user;

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
		}


	};

	return UserController;


}