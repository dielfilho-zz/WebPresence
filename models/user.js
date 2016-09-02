module.exports = function(app){

	var mongoose = require('mongoose');
	var Schema =  mongoose.Schema;
    var ObjectId = mongoose.Types.ObjectId;

	var user = Schema({
		name : 	{type: String, required: true},
		phone_mac : String,
		email: String,
		username: {type: String, required: true},
		pass: {type: String, required: true},
		roles: [{type: Schema.Types.ObjectId, ref: 'Role'}]
	});
	
	user.statics.checkLogin = function(user, callback){
        console.log(user.role);
		var query = {username: user.username, pass: user.pass, 'roles' : user.role._id};
		this.findOne(query).populate('roles').exec(callback);
	};

	user.statics.getAllTrainees = function(callback){
        //GET TRAINEE'S ROLE ID
        var query = { "roles" : ObjectId("57a9b7eb6153dcaea68e2277") };
        
		this.find(query).populate('roles').exec(callback);
	};

	user.statics.insert = function(user, callback){
		var _user = new this();
        _user.name = user.name;
        _user.pass = user.pass;
        _user.email = user.email;
        _user.username = user.username;
        _user.roles = user.roles;
        console.log(user);
        _user.save(callback);
	}

	return db.model('User', user);

}
