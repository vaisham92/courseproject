binary.controller('resultsController', function($scope, $http, $routeParams) {
	function getRank () {
        $http({
            method: 'GET',
            url: '/api/getResultF'
        }).success(function(data) {
            //  alert(data);
            $scope.rank = data.rank;
            $scope.time = data.scoreboard[0].Time;
            $scope.score = data.scoreboard[0].Score;
        }).error(function(error) {
                $scope.inval_mess = "An unexpected error occured. Try again.";
        });
    }
    getRank();
});