/**
 * Created by Vaishampayan on 11/29/2016.
 */

binary.controller('registrationController', function($scope, $http, $routeParams) {

	 $scope.doSignUp = function() {
	 	console.log("register");
		            $http({
		                method: 'POST',
		                url: '/api/userRegister',
		                data:{
		                	"email" : $scope.email,
		                	"password" : $scope.password,
		                	"fname" : $scope.first_name,
		                	"lname" : $scope.last_name,
		                	"school" : $scope.school
		                }
		            }).success(function(data) {
						// checking the response data for statusCode
						if (data.Status == 200) {
							 window.location.assign("/levels");
							
						} else if (data.Status == 500){
							$scope.inval_mess = data.Message;
						}
						else{
							$scope.inval_mess = "An unexpected error occured. Try again.";
						}

					}).error(function(error) {
							$scope.inval_mess = "An unexpected error occured. Try again.";
					});
		        
		    };

});