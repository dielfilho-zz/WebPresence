angular.module("app").controller("TraineeController", function($scope, loginServiceAPI, traineeService, $state, $stateParams, toastService, teamService){

    //VARIABLES
    //Get the trainee id
    $scope.trainee = $stateParams.userLogged ? $stateParams.userLogged : $scope.trainee;
    $scope.teams = [];
    $scope.roles = [];
    $scope.teamSelected = $stateParams.teamSelected ? $stateParams.teamSelected : $scope.teamSelected;


    console.log($scope.trainee);
    console.log($scope.teamSelected);
    //FUNCTIONS
    getTraineeTeams();
    getAllRoles();

    function getTraineeTeams() {
        if($scope.trainee) {
            teamService.getTraineeTeams($scope.trainee._id).then(function (response) {
                $scope.teams = response.data.data ? response.data.data : [];
            });
        }
    };

    function getAllRoles(){
        loginServiceAPI.getRoles().success(function(response){
            var result = response.result;
            if(result){
                $scope.roles = result;
            }else{
                console.error("Error get all Roles!");
            }
        });
    };

	$scope.createAccount = function(trainee){

           //Setting the trainee role.
           var roleTrainee = $scope.roles.filter(function(role){
               return role.type == "TRAINEE";
           }) ;

           $scope.trainee.roles = [roleTrainee[0]._id];
           traineeService.createAccount(trainee).success(function(traineeInserted){
           $scope.trainee = traineeInserted;

           //Redirecting trainee to home page.
           $state.go("homeTrainee");

            toastService.showMessage("Conta criada com sucesso!", 4000);
        }).error(function(err){
            console.log(err);
        });
	};

    $scope.teamDetails = function(team){
        $state.go('teamDetails', {teamSelected : team});
    };

});