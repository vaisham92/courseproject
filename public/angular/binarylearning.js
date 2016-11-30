/**
 * Created by Vaishampayan on 11/29/2016.
 */
var binary = angular.module('binary', ['ngRoute']);

$(document).ready(function () {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
});

binary.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider, $routeParams) {
        $routeProvider
            .when('/', {
                templateUrl: 'landing.html',
                controller: 'mainController'
            }).when('/login', {
            templateUrl: 'login.html',
            controller: 'loginController'
        }).when('/register', {
            templateUrl: 'register.html',
            controller: 'registrationController'
        }).when('/levels', {
            templateUrl: 'levels.html',
            controller: 'levelController'
        }).when('/tutorials', {
            templateUrl: 'tutorials.html',
            controller: 'tutorialController'
        })
            .otherwise({
                templateUrl: '404.html',
                controller: '404Controller'
            });
        $locationProvider.html5Mode(true);
    }
]);

binary.controller('mainController', function ($scope, $http, $routeParams, $location) {
    $scope.doLogin = function () {
        console.log("login");
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

    $(document).ready(function () {
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal-trigger').leanModal();
        //alert("Ashna not asna");
    });


    getHallOfFame();

    function getHallOfFame(){
                $http({
                                method: 'GET',
                                url: '/api/getHallOfFame'
                            }).success(function(data) {
                                // checking the response data for statusCode
                                if (data.Status == 200) {
                                    console.log("hall of fame success");
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

    $scope.doLogin = function () {
        console.log("login");
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
                console.log("login success");

                window.location.assign("#/levels");

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

    $scope.doSignUp = function () {
        console.log("register");
        $http({
            method: 'POST',
            url: '/api/userRegister',
            data: {
                "email": $scope.email,
                "password": $scope.password,
                "fname": $scope.first_name,
                "lname": $scope.last_name,
                "school": $scope.school
            }
        }).success(function (data) {
            // checking the response data for statusCode
            if (data.Status == 200) {
                window.location.assign("/levels");

            } else if (data.Status == 500) {
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





