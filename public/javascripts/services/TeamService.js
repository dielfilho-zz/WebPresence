angular.module("app").factory("teamService", function($http){

	var _getAll = function(){
		return $http.get('/team');
	};

	var _createTeam = function(team){
		return $http.post('/team', team);
	};

	var _getTraineeTeams = function(idTrainee){
        return $http.get('/team/trainee/'+idTrainee);
	};

    var _haveWorkToday = function(idTeam){
        return $http.get('/team/haveWorkToday/'+idTeam);
    };

	return {
		getAll : _getAll,
		createTeam: _createTeam,
        getTraineeTeams : _getTraineeTeams,
        haveWorkToday : _haveWorkToday
	};

});