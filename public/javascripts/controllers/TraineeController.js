angular.module("app").controller("TraineeController", function($scope, loginServiceAPI, traineeService, $state, $stateParams, toastService, teamService){

    //VARIABLES
    //Get the trainee id
    $scope.trainee = {_id: $stateParams.userId, role:{}};
    $scope.teams = [];
    $scope.roles = [];
    $scope.teamSelected = {};
    $scope.presences = [];
    $scope.showButtonCheckPresence = false;

    //FUNCTIONS
    getTraineeTeams();
    getAllRoles();
    getTraineePresences();
    haveWorkToday();

    $scope.isTeamsEmpty = function(){
        return $scope.teams.length == 0;
    };
    
    function haveWorkToday() {

        if($stateParams.teamId)
            teamService.haveWorkToday($stateParams.teamId).success(function(response){
                console.log(response);
                $scope.showButtonCheckPresence = response.result;
            });
    };

    $scope.checkPresence = function(){
        traineeService.checkPresence($scope.trainee._id, $scope.teamSelected._id).success(function(response){
            console.log(response);
            if(response.result){
                if(response.data) {
                    toastService.showMessage("Presença cadastrada com sucesso!", 4000);
                }
            }else{
                toastService.showMessage("Não foi possível cadastrar sua presença", 4000);
            }
        });
    };

    function getTraineePresences(){
        var teamId = $stateParams.teamId;
        if(teamId) {
            traineeService.getTeamPresence(teamId, $scope.trainee._id).success(function (response) {
                if (response.result) {
                    $scope.presences = response.data;

                    var today = new Date();

                    //CHECKING IF THE USER HAS THE PRESENCE FOR TODAY
                    //IF HE DOES, THE BUTTOM TO CONFIRM PRESENCE WILL DISAPEAR
                    var res = response.data.some(function(pres){
                        return (new Date(pres.date)).getDay() == today.getDay();
                    });

                    $scope.showButtonCheckPresence = res;


                } else {
                    toastService.showMessage("Não foi possível obter suas presenças!", 4000);
                }
            });
        }
    }

    function getSelectedTeam(){
        return $scope.teams.filter(function(team){
            return team._id == $stateParams.teamId;
        })[0];
    }

    function getTraineeTeams() {
        teamService.getTraineeTeams($scope.trainee._id).then(function (response) {
            $scope.teams = response.data.data ? response.data.data : [];
            //Getting the selected team
            $scope.teamSelected = getSelectedTeam();

        });
    };


    function getAllRoles(){
        loginServiceAPI.getRoles().success(function(response){
            var result = response.result;
            if(result){
                $scope.roles = response.data;
            }else{
                console.error("Error get all Roles!");
            }
        });
    };

	$scope.createAccount = function(trainee){


           // //Setting the trainee role.
           // var roleTrainee = $scope.roles.filter(function(role){
           //     return role.type == "TRAINEE";
           // }) ;

        $scope.trainee.role.type = "TRAINEE";
        traineeService.createAccount(trainee).success(function(response){

            if(response.result){
                $scope.trainee = response.data;

                //Redirecting trainee to home page.
                $state.go("homeTrainee");

                toastService.showMessage("Conta criada com sucesso!", 4000);
            }else{
                toastService.showMessage("Nao foi possivel criar sua conta!", 4000);
            }
        }).error(function(err){
            console.log(err);
        });
	};

    $scope.teamDetails = function(team){
        $state.go('teamDetails', {teamId : team._id, userId:$scope.trainee._id});
    };

});