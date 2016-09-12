angular.module("app").config(function($stateProvider, $urlRouterProvider){

	// ADMIN ROUTES

    $stateProvider.state({
        url : '/',
        name:'login',
        controller: 'LoginController',
		templateUrl: 'templates/home/login.html'
	});

    $stateProvider.state({
        url: '/admin/home/:userId',
        name:'homeAdmin',
        templateUrl: 'templates/admin/home.html',
		controller: 'AdminController'
    });

    $stateProvider.state({
        url:'/team/create',
        name:'createTeam',
		templateUrl: 'templates/admin/create_team.html',
		controller: 'AdminController'
    });


    //TRAINEE ROUTES

    $stateProvider.state({
        url:'/trainee/newAccount',
        name: 'traineeNewAccount',
		templateUrl: 'templates/trainee/create_account.html',
		controller: 'TraineeController'
    });

    $stateProvider.state({
        url:'/trainee/home/:userId',
        name: 'homeTrainee',
        templateUrl : 'templates/trainee/home.html',
        controller : 'TraineeController'
    });

    $stateProvider.state({
        url:'/trainee/team_details/:teamId',
        name:'teamDetails',
        templateUrl : 'templates/trainee/team_details.html',
        controller : 'TraineeController'
    });


    // //DEFAULT ROUTE
    $urlRouterProvider.otherwise("/");

});