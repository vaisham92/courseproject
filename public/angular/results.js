binary.controller('resultsController', function($scope, $http, $routeParams) {
	
	
	
	function getRank () {
        $http({
            method: 'GET',
            url: '/api/getCurrentTest'
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

}