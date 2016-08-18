angular.module("app").factory("teamService", function($http){

	var _getAll = function(){
		return $http.get('/team');
	};


	return {
		getAll : _getAll
	};

});