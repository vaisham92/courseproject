binary.controller('levelController', function($scope, $http, $routeParams) {



	 $scope.getEasyScoreboard = function() {
					console.log(level);
		            $http({
		                method: 'POST',
		                url: '/api/getScoreboard',
		                data:{
		                	"level" : "easy"
		                }
		            }).success(function(data) {
						// checking the response data for statusCode
						if (data.Status == 200) {
							 //window.location.assign("/levels");
							 console.log(data);
							 $scope.easy_scoreboard = [];
							 
							
						} else if (data.Status == 401){
							$scope.inval_mess = data.Message;
						}
						else{
							$scope.inval_mess = "An unexpected error occured. Try again.";
						}

					}).error(function(error) {
							$scope.inval_mess = "An unexpected error occured. Try again.";
					});
					
		        
		    };

	$scope.getHardScoreboard = function() {
					console.log(level);
		            $http({
		                method: 'POST',
		                url: '/api/getScoreboard',
		                data:{
		                	"level" : "hard"
		                }
		            }).success(function(data) {
						// checking the response data for statusCode
						if (data.Status == 200) {
							 //window.location.assign("/levels");
							 console.log(data);
							
						} else if (data.Status == 401){
							$scope.inval_mess = data.Message;
						}
						else{
							$scope.inval_mess = "An unexpected error occured. Try again.";
						}

					}).error(function(error) {
							$scope.inval_mess = "An unexpected error occured. Try again.";
					});
					
		        

		        $scope.getMediumScoreboard = function() {
					console.log(level);
		            $http({
		                method: 'POST',
		                url: '/api/getScoreboard',
		                data:{
		                	"level" : "medium"
		                }
		            }).success(function(data) {
						// checking the response data for statusCode
						if (data.Status == 200) {
							 //window.location.assign("/levels");
							 console.log(data);
							
						} else if (data.Status == 401){
							$scope.inval_mess = data.Message;
						}
						else{
							$scope.inval_mess = "An unexpected error occured. Try again.";
						}

					}).error(function(error) {
							$scope.inval_mess = "An unexpected error occured. Try again.";
					});
					
		        

	 $scope.challenge = function(level) {
					console.log(level);
		            $http({
		                method: 'POST',
		                url: '/api/BinaryTest',
		                data:{
		                	"level" : level
		                }
		            }).success(function(data) {
						// checking the response data for statusCode
						if (data.Status == 200) {
							 //window.location.assign("/levels");
							 console.log(data);
							
						} else if (data.Status == 401){
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