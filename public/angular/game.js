/**
 * Created by Vaishampayan on 11/30/2016.
 */

binary.controller('gameController', function ($scope, $http, $routeParams, $location) {
    $scope.isFlipped0 = true;
    $scope.isFlipped1 = true;
    $scope.isFlipped2 = true;
    $scope.isFlipped3 = true;

    $scope.isFlipped4 = true;
    $scope.isFlipped5 = true;
    $scope.isFlipped6 = true;
    $scope.isFlipped7 = true;

    $scope.flip0 = function () {
        $scope.isFlipped0 = !$scope.isFlipped0;
    };
    $scope.flip1 = function () {
        $scope.isFlipped1 = !$scope.isFlipped1;
    };
    $scope.flip2 = function () {
        $scope.isFlipped2 = !$scope.isFlipped2;
    };
    $scope.flip3 = function () {
        $scope.isFlipped3 = !$scope.isFlipped3;
    };

    $scope.flip4 = function () {
        $scope.isFlipped4 = !$scope.isFlipped4;
    };
    $scope.flip5 = function () {
        $scope.isFlipped5 = !$scope.isFlipped5;
    };
    $scope.flip6 = function () {
        $scope.isFlipped6 = !$scope.isFlipped6;
    };
    $scope.flip7 = function () {
        $scope.isFlipped7 = !$scope.isFlipped7;
    };

    $scope.submitAnswers(){

                    $http({
                        method: 'POST',
                        url: '/api/SubmitAns',
                        data:{
                            "userId":$scope.session.user,
                            "time" : $scope.timeTaken,
                            "testId":$scope.session.testId,
                            "level":$scope.session.level    ,
                            "response":[{"question":25,"answer":11001},
                                        {"question":13,"answer":1101},
                                        {"question":12,"answer":1100}
                                        ]}
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
    }

    function getRank(){

                    $http({
                        method: 'GET',
                        url: '/api/getRank/' + $scope.session.testId + '/' + $scope.session.level
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
    }

     function getDetailsFromSession(){
            $http({
                        method: 'GET',
                        url: '/api/getDetailsFromSession'
                    }).success(function(data) {
                        // checking the response data for statusCode
                        if (data.Status == 200) {
                            $scope.session = data.message;
                            
                        } 
                        else{
                            //window.assign.location("/");
                        }

                    }).error(function(error) {
                            //window.assign.location("/");
                    });
      }
});