module.exports = function(app){

	var User = app.models.user;
	var Role = app.models.role;

	var HomeController = {

		index: function(req, res){
			res.render('index');
		},

		getRoles: function(req, res){
			Role.find({}, function(err, roles){
				if(err){
					console.log("Error when trying get all roles: "+err);
					res.json({result: false});
				}
				res.json({result: roles});
			});
		},

		checkLogin: function(req, res){
			var user = req.body;

			User.checkLogin(user, function(err, userDB){
				if( err || !userDB ){
					console.log(err+" "+userDB);
					return res.json({result : false});
				}
				console.log("User: "+userDB+" added to session!");
				req.session.userLogged = userDB;
				return res.json({result:true, user:userDB});
			});
			
		},

		logout: function(req, res){
			req.session.destroy();
			console.log("Session was destroyed!");
			res.render('index');
		}

	};

	return HomeController;
}