angular.module("app").config(function($routeProvider){

	// ADMIN ROUTES

	$routeProvider.when('/', {
		templateUrl: 'templates/home/login.html',
		controller: 'LoginController'
	});

	$routeProvider.when('/admin/home/:id', {
		templateUrl: 'templates/admin/home.html',
		controller: 'AdminController'
	});	

	$routeProvider.when('/team/create', {
		templateUrl: 'templates/admin/create_team.html',
		controller: 'AdminController'
	});	


	//TRAINEE ROUTES

	$routeProvider.when('/trainee/newAccount', {
		templateUrl: 'templates/trainee/create_account.html',
		controller: 'TraineeController'
	});
	
	$routeProvider.when('/trainee/home/:id', {
       templateUrl : 'templates/trainee/home.html',
       controller : 'TraineeController'
    });

    //DEFAULT ROUTE
    $routeProvider.otherwise({redirectTo : "/"});

});