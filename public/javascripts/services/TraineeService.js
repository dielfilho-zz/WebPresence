angular.module('app').factory('traineeService', function($http){

	var _getAllTrainees = function(){
		return $http.get('/trainee');
	}

	var _createAccount = function(trainee){
		return $http.post('/trainee', trainee);
	}

	return {
		getAllTrainees : _getAllTrainees,
		createAccount : _createAccount
	}
});