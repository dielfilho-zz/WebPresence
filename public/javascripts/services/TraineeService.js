angular.module('app').factory('traineeService', function($http){

	var _getAllTrainees = function(){
        return $http.get('/trainee');
	};

	var _createAccount = function(trainee){
		return $http.post('/trainee', trainee);
	};

	var _getTeamPresence = function(idTeam, idTrainee){
        return $http.get('/trainee/presence/'+idTeam+'/'+idTrainee);
	};

    var _checkPresence = function(idTrainee){
        return $http.post('/trainee/presence', {idTrainee : idTrainee});
    };

	return {
		getAllTrainees : _getAllTrainees,
		createAccount : _createAccount,
		getTeamPresence : _getTeamPresence,
        checkPresence : _checkPresence
	}
});