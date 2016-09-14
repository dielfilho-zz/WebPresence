angular.module("app").controller("AdminController", function($scope, teamService, traineeService, $stateParams, toastService){

    //VARIABLES
    $scope.admin = $stateParams.userLogged;
    $scope.teams = [];
	$scope.trainees = [];

    $scope.tempTeam = {name : "", date_init : null, date_end : null, days : [], trainees : []};

	$scope.daysOfWeek = [
        {name:"Segunda", id: 1, checkTimes : []},
        {name:"Terça",   id: 2, checkTimes : []},
        {name:"Quarta",  id: 3, checkTimes : []},
        {name:"Quinta",  id: 4, checkTimes : []},
        {name:"Sexta",   id: 5, checkTimes : []},
        {name:"Sábado",  id: 6, checkTimes : []},
        {name:"Domingo", id: 7, checkTimes : []},
    ];


    //FUNCTIONS
    var getAllTeams = function(){
        teamService.getAll().then(function(response){
            console.log(response);
            if(response.data.result){
                $scope.teams = response.data.data;
            }else{
                toastService.showMessage("Não foi possível pegar todas os Times!", 4000);
            }
        });
    };
    getAllTeams();

	$scope.isTeamsEmpty = function(){
		return $scope.teams.length == 0;
	};

	$scope.isThereAnyTrainees = function(){
		return $scope.trainees > 0;
	};

	traineeService.getAllTrainees().then(function(response){
		$scope.trainees = response.data.trainees;
		
		if(!$scope.trainees || !$scope.trainees > 0)
            toastService.showMessage("Nao há nenhum estagiário cadastrado ate o momento!", 5000);
	});

	//ADD TEAM FUNCTIONS
    $scope.createTeam = function(tempTeam){
        var selectedTrainees = $scope.trainees.filter(function(trainee){
            return trainee.selected;
        });
        tempTeam.trainees = selectedTrainees;
        teamService.createTeam(tempTeam).then(function(response){
            if(response.data.result){
                toastService.showMessage("Turma cadastrado com sucesso!", 4000);
            }else{
                toastService.showMessage("Não foi possível cadastrar essa Turma!", 4000);
            }
        });
    };

    $scope.addCheckTime = function(checkTime){
        var cpCheckTime = angular.copy(checkTime);
        delete($scope.checkTime);
        $scope.daySelected.checkTimes.push(cpCheckTime);
    };

    $scope.removeCheckTime = function(index){
        $scope.daySelected.checkTimes.splice(index, 1);
    };

    $scope.addTeamDay = function(daySelected){
        var cpDaySelected = angular.copy(daySelected);
        $scope.tempTeam.days.push(cpDaySelected);
    };

    $scope.getButtonDayColor = function(day){
        return (day.checkTimes.length > 0 && day.time_init && day.time_end ) ? "green" : "blue-grey";
    }

    //MODAL FUNCTIONS
	$scope.openModalDay = function(day){
		$scope.daySelected = day;
	};

	
});