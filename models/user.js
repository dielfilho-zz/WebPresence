module.exports = function(app){

	var mongoose = require('mongoose');
	var Schema =  mongoose.Schema;
    var ObjectId = mongoose.Types.ObjectId;

    var Role = app.models.role;

	var user = Schema({
		name : 	{type: String, required: true},
		phone_mac : [{type: String}],
		email: String,
		username: {type: String, required: true},
		pass: {type: String, required: true},
		roles: [{type: Schema.Types.ObjectId, ref: 'Role'}]
	});
	
	user.statics.checkLogin = function(user, callback){
        var self = this;
        Role.getRoleByType(user.role.type, function(err, role){
        	var query = {username: user.username, pass: user.pass, 'roles' : role._id};
			self.findOne(query).populate('roles').exec(callback);
        });
	};

	user.statics.getAllTrainees = function(callback){
        //GET TRAINEE'S ROLE ID
        var query = { "roles" : ObjectId("57a9b7eb6153dcaea68e2277") };
        
		this.find(query).populate('roles').exec(callback);
	};

	user.statics.insert = function(user, callback){
		var _user = new this();

		Role.getRoleByType(user.role.type, function(err, role){
			_user.name = user.name;
        	_user.pass = user.pass;
        	_user.email = user.email;
        	_user.username = user.username;
        	_user.roles = role._id;
        
        	_user.save(callback);
        });
		
	}

	return db.model('User', user);

}
