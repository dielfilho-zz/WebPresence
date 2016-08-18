angular.module("app").controller("AdminController", function($scope, teamService, traineeService, $routeParams){

    //VARIABLES

    $scope.admin = {};
    $scope.teams = [];
	$scope.trainees = [];


    //Getting the admin id
    $scope.admin._id = $routeParams.id;

	$scope.isTeamsEmpty = function(){
		return $scope.teams.length <= 0;
	}

	$scope.isThereAnyTrainees = function(){
		return $scope.trainees > 0;
	}

	traineeService.getAllTrainees().then(function(response){
		console.log(response);
		$scope.trainees = response.data.trainees;
		
		if(!$scope.trainees || !$scope.trainees > 0)
			Materialize.toast("Nao há nenhum estagiario cadastrado ate o momento!", 5000);
	});

	
});