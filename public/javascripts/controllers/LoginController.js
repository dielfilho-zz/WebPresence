angular.module("app").controller("LoginController", function($scope, loginServiceAPI, $state, toastService){

    loginServiceAPI.getRoles().success(function(response){
		var result = response.result;
        console.log(response);
        if(result){
			$scope.roles = response.data;
		}else{
			console.error("Error get all Roles!");
		}
	}).error(function(err){
        console.log("Error at login");
        console.log(err);
    });

	$scope.checkLogin = function(user){
		console.log("Sending the request...");
		
		loginServiceAPI.checkLogin(user).success(function(response){
			var result = response.result;
            if(!result){
				toastService.showMessage('Usuario e/ou Senha invalidos!', 4000);
			}else{
                //Get returned user
                var userLogged = response.data;

                //Checking the role selected
                var path = "homeTrainee";
				if(user.role.type == "ADMIN")
                    path = "homeAdmin";

				$state.go(path, {userId : userLogged._id});
			}

		}).error(function(response){
            console.log("Error: "+response);
		});
	};

});