binary.controller('confirmationController', function($scope, $http, $routeParams) {
    $scope.pageClass = 'page-home';
	$(document).ready(function () {
	    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
	    $('.modal-trigger').leanModal();
	});
	
	
	$scope.startChallenge = function(){
		window.location.assign("/game");
	};
	
	$scope.hideLogin = false;
	getDetailsFromSession();
	
	function getDetailsFromSession(){
        $http({
                    method: 'GET',
                    url: '/api/getDetailsFromSession'
                }).success(function(data) {
                    // checking the response data for statusCode
                	console.log("get session");
                	console.log(data);
                    if (data.status == 200) {
                    	
                        $scope.session = data.message;
                        console.log($scope.session);
                        if($scope.session.user){
                        	$scope.hideLogin = true;

                        }
                        else{
                        	$scope.hideLogin = false;
                        }
                    } 
                    else{
                    	$scope.hideLogin = false;
                    }

                }).error(function(error) {
                	$scope.hideLogin = false;
                });
  }
});