angular.module("app").controller("TraineeController", function($scope, loginServiceAPI, traineeService, $state, $stateParams, toastService, teamService){

    //VARIABLES
    //Get the trainee id
    $scope.trainee = {_id: $stateParams.userId};
    $scope.teams = [];
    $scope.roles = [];
    $scope.teamSelected = {};
    $scope.presences = [];

    //FUNCTIONS
    getTraineeTeams();
    getAllRoles();
    checkPresence();

    function checkPresence(){
        traineeService.checkPresence($scope.trainee._id).success(function(response){
            console.log(response);
        });
    };

    function getTraineeTeams() {
        teamService.getTraineeTeams().then(function (response) {
            $scope.teams = response.data.data ? response.data.data : [];
            //Getting the selected team
            $scope.teamSelected = $scope.teams.filter(function(team){
                return team._id == $stateParams.teamId;
            })[0];
        });
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

        traineeService.getTeamPresence(team._id, $scope.trainee._id).success(function(response){
            console.log(response);
        });

        $state.go('teamDetails', {teamId : team._id});
    };

});