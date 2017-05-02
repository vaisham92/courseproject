/**
 * Created by Vaishampayan on 11/29/2016.
 */
var binary = angular.module('binary', ['ngRoute', 'angular-svg-round-progressbar','ngAnimate']);

$(document).ready(function () {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
});

binary.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider, $routeParams, $timeout) {
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
                controller: 'tutorialsController'
            }).when('/game', {
                templateUrl: 'game.html',
                controller: 'gameController'
            }).when('/confirmation', {
                templateUrl: 'confirmation.html',
                controller: 'confirmationController'
            }).when('/results', {
                templateUrl: 'results.html',
                controller: 'resultsController'
            }).when('/practice', {
                templateUrl: 'practice.html',
                controller: 'practiceController'
            })
            .otherwise({
                templateUrl: '404.html',
                controller: '404Controller'
            });
        $locationProvider.html5Mode(true);
    }
]);

binary.controller('mainController', function ($scope, $http, $routeParams, $location) {
    $scope.pageClass = 'page-home';
	getDetailsFromSession();
	
	$scope.hideName = true;
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
                                    $scope.easy_scoreboard = [];
                                    $scope.easy_scoreboard = data.HallOfFame.Easy;
                                    $scope.medium_scoreboard = data.HallOfFame.Medium;
                                    $scope.hard_scoreboard = data.HallOfFame.Difficult;
                                    $('.preloader-background').fadeOut('slow');
                                    
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
            	
                window.location = $location.absUrl();
                $scope.hideName = false;

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
                window.location = $location.absUrl();
                $scope.hideName = false;
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
                        	$scope.hideName = false;

                        }
                        else{
                        	$scope.hideName = true;
                        }
                    } 
                    else{
                    	$scope.hideName = true;
                    }

                }).error(function(error) {
                	$scope.hideName = true;
                });
  }
    
    $scope.logout = function(){
    	 console.log("logout");
    	 var location = $location.absUrl();
         $http({
             method: 'POST',
             url: '/api/logout'
         }).success(function (data) {
             // checking the response data for statusCode
             if (data.status == 200) {

                 $scope.hideName = true;
                 console.log($location.absUrl());
                 window.location = location;
             } 
             else {
            	 $scope.hideName = false;
             }

         }).error(function (error) {
        	 $scope.hideName = false;
         });

    }
});





