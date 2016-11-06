angular.module('app').factory('loginServiceAPI', function($http){

	var _checkLogin = function(user){
		return $http.post('/login', user);
	};

	var _getRoles = function(){
        return $http.get('/roles');
	}

	return {
		checkLogin : _checkLogin,
		getRoles : _getRoles
	}


});