angular.module("app").controller("LoginController", function($scope, loginServiceAPI, $location, toastService){

	loginServiceAPI.getRoles().success(function(response){
		var result = response.result;
		if(result){
			$scope.roles = result;
		}else{
			console.error("Error get all Roles!");
		}
	});

	$scope.checkLogin = function(user){
		console.log("Sending the request...");
		
		loginServiceAPI.checkLogin(user).success(function(response){
			var result = response.result;
            if(!result){
				toastService.showMessage('Usuario e/ou Senha invalidos!', 4000);
			}else{
                //Get returned user
                var userLogged = response.user;

                //Checking the role selected
                var path = "/trainee/home";
				if(user.role.type == "ADMIN")
                    path = "/admin/home";

                $location.path(path+"/"+userLogged._id);
			}

		}).error(function(response){
            console.log("Error: "+response);
		});
	};

});