/**
 * Created by Vaishampayan on 11/30/2016.
 */

binary.controller('tutorialsController', function ($scope, $http, $routeParams, $location) {
    $scope.isFlipped0 = true;
    $scope.isFlipped1 = true;
    $scope.isFlipped2 = true;
    $scope.isFlipped3 = true;

    $scope.isFlipped4 = true;
    $scope.isFlipped5 = true;
    $scope.isFlipped6 = true;
    $scope.isFlipped7 = true;

    $scope.flip0 = function() {
        $scope.isFlipped0 = !$scope.isFlipped0;
    };
    $scope.flip1 = function() {
        $scope.isFlipped1 = !$scope.isFlipped1;
    };
    $scope.flip2 = function() {
        $scope.isFlipped2 = !$scope.isFlipped2;
    };
    $scope.flip3 = function() {
        $scope.isFlipped3 = !$scope.isFlipped3;
    };

    $scope.flip4 = function() {
        $scope.isFlipped4 = !$scope.isFlipped4;
    };
    $scope.flip5 = function() {
        $scope.isFlipped5 = !$scope.isFlipped5;
    };
    $scope.flip6 = function() {
        $scope.isFlipped6 = !$scope.isFlipped6;
    };
    $scope.flip7 = function() {
        $scope.isFlipped7 = !$scope.isFlipped7;
    };
    
    function getDetailsFromSession(){
        $http({
                    method: 'GET',
                    url: '/api/getDetailsFromSession'
                }).success(function(data) {
                    // checking the response data for statusCode
                    if (data.Status == 200) {
                        $scope.session = data.message;
                        startTest ($scope.session.level);
                    } 
                    else{
                        //window.assign.location("/");
                    }

                }).error(function(error) {
                        //window.assign.location("/");
                });
  }

});