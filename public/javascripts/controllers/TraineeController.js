angular.module("app").controller("TraineeController", function($scope, loginServiceAPI, traineeService, $location, $routeParams){

    //VARIABLES

    $scope.trainee = {};

    //Get the trainee id
    $scope.trainee._id = $routeParams.id;

    $scope.roles = [];

    loginServiceAPI.getRoles().success(function(response){
        var result = response.result;
        if(result){
            $scope.roles = result;
        }else{
            console.error("Error get all Roles!");
        }
    });

	$scope.createAccount = function(trainee){

            //Setting the trainee role.
            var roleTrainee = $scope.roles.filter(function(role){
                return role.type == "TRAINEE";
            }) ;

            $scope.trainee.roles = [roleTrainee[0]._id];

            traineeService.createAccount(trainee).success(function(traineeInserted){
            $scope.trainee = traineeInserted;

            //Redirecting trainee to home page.
            $location.path("/trainee/home");

		}).error(function(err){
			console.log(err);
		});
	};


});