binary.controller('levelController', function($scope, $http, $routeParams) {

		getEasyScoreboard();
		getMediumScoreboard();
		getHardScoreboard();

	  function getEasyScoreboard() {
					console.log("HERE");
		            $http({
		                method: 'GET',
		                url: '/api/getScoreboard/easy'
		            }).success(function(data) {
						// checking the response data for statusCode
						console.log(data);
						if (data.Status == 200) {
							 //window.location.assign("/levels");
							 console.log("here");
							 $scope.easy_scoreboard = [];
							 $scope.easy_scoreboard = data.scoreboard;
							
						} else if (data.Status == 500){
							console.log("here3");
							$scope.inval_mess = data.Message;
						}
						else{
							console.log("here4");
							$scope.inval_mess = "An unexpected error occured. Try again.";
						}

					}).error(function(error) {
							$scope.inval_mess = "An unexpected error occured. Try again.";
							console.log("here2");
					});
					
		        
		    };

		    function getMediumScoreboard() {
					console.log("HERE");
		            $http({
		                method: 'GET',
		                url: '/api/getScoreboard/medium'
		            }).success(function(data) {
						// checking the response data for statusCode
						console.log(data);
						if (data.Status == 200) {
							 //window.location.assign("/levels");
							 console.log("here");
							 $scope.medium_scoreboard = [];
							 $scope.medium_scoreboard = data.scoreboard;
							
						} else if (data.Status == 500){
							console.log("here3");
							$scope.inval_mess = data.Message;
						}
						else{
							console.log("here4");
							$scope.inval_mess = "An unexpected error occured. Try again.";
						}

					}).error(function(error) {
							$scope.inval_mess = "An unexpected error occured. Try again.";
							console.log("here2");
					});
					
		        
		    };



		    function getHardScoreboard() {
					console.log("HERE");
		            $http({
		                method: 'GET',
		                url: '/api/getScoreboard/difficult'
		            }).success(function(data) {
						// checking the response data for statusCode
						console.log(data);
						if (data.Status == 200) {
							 //window.location.assign("/levels");
							 console.log("here");
							 $scope.hard_scoreboard = [];
							 $scope.hard_scoreboard = data.scoreboard;
							
						} else if (data.Status == 500){
							console.log("here3");
							$scope.inval_mess = data.Message;
						}
						else{
							console.log("here4");
							$scope.inval_mess = "An unexpected error occured. Try again.";
						}

					}).error(function(error) {
							$scope.inval_mess = "An unexpected error occured. Try again.";
							console.log("here2");
					});
					
		        
		    };

	

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
							 //console.log(data);
							
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