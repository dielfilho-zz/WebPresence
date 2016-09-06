angular.module("app").factory("teamService", function($http){

	var _getAll = function(){
		return $http.get('/team');
	};

	var _createTeam = function(team){
		return $http.post('/team', team);
	};

	var _getTraineeTeams = function(_idTrainee){
		return $http.get('/team/trainee/'+_idTrainee);
	};


	return {
		getAll : _getAll,
		createTeam: _createTeam,
        getTraineeTeams : _getTraineeTeams
	};

});