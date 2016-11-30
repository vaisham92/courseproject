/**
 * Created by Vaishampayan on 11/29/2016.
 */
var binary = angular.module('binary', ['ngRoute']);

binary.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider, $routeParams) {
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
            }).otherwise({
                templateUrl: '404.html',
                controller: '404Controller'
            });
        $locationProvider.html5Mode(true);
    }
]);

binary.controller('mainController', function($scope, $http, $routeParams) {
    $scope.loginModalActivate = function() {
        $('#loginmodal').modal('open');
    };

    $scope.registerModalActivate = function() {
        $('#registermodal').modal('open');
    };
});





