/**
 * Created by Vaishampayan on 11/30/2016.
 */

binary.controller('gameController', function ($scope, $http, $routeParams, $location) {
    var cardFlip1 = new Audio('sounds/minion_laugh_1.mp3');
    var cardFlip2 = new Audio('sounds/minion_laugh_2.mp3');
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
        if($scope.isFlipped0)
            cardFlip1.play();
        else
            cardFlip2.play()
    };
    $scope.flip1 = function () {
        $scope.isFlipped1 = !$scope.isFlipped1;
        if($scope.isFlipped1)
            cardFlip1.play();
        else
            cardFlip2.play()
    };
    $scope.flip2 = function () {
        $scope.isFlipped2 = !$scope.isFlipped2;
        if($scope.isFlipped2)
            cardFlip1.play();
        else
            cardFlip2.play()
    };
    $scope.flip3 = function () {
        $scope.isFlipped3 = !$scope.isFlipped3;
        if($scope.isFlipped3)
            cardFlip1.play();
        else
            cardFlip2.play()
    };

    $scope.flip4 = function () {
        $scope.isFlipped4 = !$scope.isFlipped4;
        if($scope.isFlipped4)
            cardFlip1.play();
        else
            cardFlip2.play()
    };
    $scope.flip5 = function () {
        $scope.isFlipped5 = !$scope.isFlipped5;
        if($scope.isFlipped5)
            cardFlip1.play();
        else
            cardFlip2.play()
    };
    $scope.flip6 = function () {
        $scope.isFlipped6 = !$scope.isFlipped6;
        if($scope.isFlipped6)
            cardFlip1.play();
        else
            cardFlip2.play()
    };
    $scope.flip7 = function () {
        $scope.isFlipped7 = !$scope.isFlipped7;
        if($scope.isFlipped7)
            cardFlip1.play();
        else
            cardFlip2.play()
    };

    var timer = function(){
        var min = 10;
        var seconds = 1;
        var handler = function() {
            seconds--;
            if(min == 0 && seconds == 0) {
                // timeout call the submit the answers
            }
            if (seconds == 0) {
                seconds = 59;
                min--;
                //if (min == 0) min = 0;
            }
            document.getElementById("time").innerHTML = (min < 10 ? "0" + min : min) + ":" + (seconds < 10 ? "0" + seconds : seconds);
        };
        handler();
        setInterval(handler, 1000);

        $scope.color = "#0000ff"
        $('#demoTimer').polartimer({
            timerSeconds: 600,
            color: $scope.color,
            opacity: 0.7,
            callback: function () {
                //alert('jquery.polartimer.js: done!');
            }
        });

        // start the timer
        $('#demoTimer').polartimer('start');
    };

    timer();




    getDetailsFromSessionBeforeGame();

    function startTest (level) {
                    console.log(level);
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



    $scope.submitAnswers = function(){
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
                             getRank();                        
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

     function getDetailsFromSessionBeforeGame(){
    	 console.log("get detail from session before game")
            $http({
                        method: 'GET',
                        url: '/api/getDetailsFromSession'
                    }).success(function(data) {
                        // checking the response data for statusCode
                    	console.log(data);
                        if (data.status == 200) {

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