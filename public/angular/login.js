/**
 * Created by Vaishampayan on 11/29/2016.
 */

binary.controller('loginController', function ($scope, $http, $routeParams) {
    $scope.doLogin = function () {
        $http({
            method: 'POST',
            url: '/api/login',
            data: {
                "email": $scope.email,
                "password": $scope.password
            }
        }).success(function (data) {
            // checking the response data for statusCode
            if (data.Status == 200) {
                window.location.assign("/levels");

            } else if (data.Status == 401) {
                $scope.inval_mess = data.Message;
            }
            else {
                $scope.inval_mess = "An unexpected error occured. Try again.";
            }
        }).error(function (error) {
            $scope.inval_mess = "An unexpected error occured. Try again.";
        });
    };
});