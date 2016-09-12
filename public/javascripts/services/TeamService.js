angular.module("app").factory("teamService", function($http){

	var _getAll = function(){
		return $http.get('/team');
	};

	var _createTeam = function(team){
		return $http.post('/team', team);
	};

	var _getTraineeTeams = function(){
		return $http.get('/team/trainee/');
	};


	return {
		getAll : _getAll,
		createTeam: _createTeam,
        getTraineeTeams : _getTraineeTeams
	};

});