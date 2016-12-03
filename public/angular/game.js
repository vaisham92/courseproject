/**
 * Created by Vaishampayan on 11/30/2016.
 */

binary.controller('gameController', function ($scope, $http, $routeParams, $location) {
    getDetailsFromSessionBeforeGame();
    function getDetailsFromSessionBeforeGame() {
        console.log("get detail from session before game")
        $http({
            method: 'GET',
            url: '/api/getDetailsFromSession'
        }).success(function (data) {
            // checking the response data for statusCode
            console.log(data);
            if (data.status == 200) {
                $scope.session = data.message;
            }
            else {
                //window.assign.location("/");
            }

        }).error(function (error) {
            //window.assign.location("/");
        });
    }

    var cardFlip1 = new Audio('sounds/cardflip1.mp3');
    var cardFlip2 = new Audio('sounds/cardflip1.mp3');
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
        if ($scope.isFlipped0)
            cardFlip1.play();
        else
            cardFlip2.play()
    };
    $scope.flip1 = function () {
        $scope.isFlipped1 = !$scope.isFlipped1;
        if ($scope.isFlipped1)
            cardFlip1.play();
        else
            cardFlip2.play()
    };
    $scope.flip2 = function () {
        $scope.isFlipped2 = !$scope.isFlipped2;
        if ($scope.isFlipped2)
            cardFlip1.play();
        else
            cardFlip2.play()
    };
    $scope.flip3 = function () {
        $scope.isFlipped3 = !$scope.isFlipped3;
        if ($scope.isFlipped3)
            cardFlip1.play();
        else
            cardFlip2.play()
    };

    $scope.flip4 = function () {
        $scope.isFlipped4 = !$scope.isFlipped4;
        if ($scope.isFlipped4)
            cardFlip1.play();
        else
            cardFlip2.play()
    };
    $scope.flip5 = function () {
        $scope.isFlipped5 = !$scope.isFlipped5;
        if ($scope.isFlipped5)
            cardFlip1.play();
        else
            cardFlip2.play()
    };
    $scope.flip6 = function () {
        $scope.isFlipped6 = !$scope.isFlipped6;
        if ($scope.isFlipped6)
            cardFlip1.play();
        else
            cardFlip2.play()
    };
    $scope.flip7 = function () {
        $scope.isFlipped7 = !$scope.isFlipped7;
        if ($scope.isFlipped7)
            cardFlip1.play();
        else
            cardFlip2.play()
    };

    var fetchTheBinaryNumber = function(success) {
        var binary = "";
        if($scope.isFlipped7) {
            binary += "1";
        }
        else if(!$scope.isFlipped7) {
            binary += "0";
        }
        if($scope.isFlipped6) {
            binary += "1";
        }
        else if(!$scope.isFlipped6) {
            binary += "0";
        }
        if($scope.isFlipped5) {
            binary += "1";
        }
        else if(!$scope.isFlipped5) {
            binary += "0";
        }
        if($scope.isFlipped4) {
            binary += "1";
        }
        else if(!$scope.isFlipped4) {
            binary += "0";
        }
        if($scope.isFlipped3) {
            binary += "1";
        }
        else if(!$scope.isFlipped3) {
            binary += "0";
        }
        if($scope.isFlipped2) {
            binary += "1";
        }
        else if(!$scope.isFlipped2) {
            binary += "0";
        }
        if($scope.isFlipped1) {
            binary += "1";
        }
        else if(!$scope.isFlipped1) {
            binary += "0";
        }
        if($scope.isFlipped0) {
            binary += "1";
            success(binary);
        }
        else if(!$scope.isFlipped0) {
            binary += "0";
            success(binary);
        }

    };

    var fetchNextQuestion = function() {
        $http({
            method: 'GET',
            url: '/api/getNextQ'
        }).success(function (data) {
            $scope.currentQ = data.question.question;
            $scope.currentQID = data.questionId;
            $('.preloader-background').fadeOut('slow');

            if(data.status == 200) {
                $scope.currentQ = data.question.question;
                $scope.currentQID = data.questionId;
                $('.preloader-background').fadeOut('slow');
            }
        });
    };
    fetchNextQuestion();

    var postAnswer = function(answer) {
        $http({
            method: 'POST',
            url: '/api/postAns',
            data: {
                "question": $scope.currentQ,
                "answer": $scope.answer
            }
        }).success(function (data) {

        }).error(function (error) {
            $scope.inval_mess = "An unexpected error occured. Try again.";
        });
    };

    var resetFlip = function() {
        $scope.isFlipped0 = true;
        $scope.isFlipped1 = true;
        $scope.isFlipped2 = true;
        $scope.isFlipped3 = true;

        $scope.isFlipped4 = true;
        $scope.isFlipped5 = true;
        $scope.isFlipped6 = true;
        $scope.isFlipped7 = true;
    };

    $scope.completeTest = function() {
        $http({
            method: 'POST',
            url: '/api/SubmitAns',
            data: {
            }
        }).success(function (data) {
        }).error(function (error) {
            $scope.inval_mess = "An unexpected error occured. Try again.";
        });
    };

    $scope.sumbitAns = function() {
        $('.preloader-background').fadeIn('slow');
        if($scope.currentQID == 10) {
            // submit the test
            fetchTheBinaryNumber(function(binaryAns) {
                postAnswer(binaryAns);
                resetFlip();
                $scope.completeTest();
                $('.preloader-background').fadeOut('slow');
                window.location = "/results";
            });
        }
        else {
            fetchTheBinaryNumber(function(binaryAns) {
                //$('.preloader-background').fadeOut('slow');
                postAnswer(binaryAns);
                resetFlip();
                fetchNextQuestion();
                $('.preloader-background').fadeOut('slow');
            });
        }
    };

    var timer = function () {
        var min = 10;
        var seconds = 1;
        var handler = function () {
            seconds--;
            if (min == 0 && seconds == 0) {
                // timeout call the submit the answers
            }
            if (seconds == 0) {
                seconds = 59;
                min--;
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
                // done with the quiz
            }
        });
        // start the timer
        $('#demoTimer').polartimer('start');
    };

    timer();

    // var fetchQuestions = function() {
    //     $http({
    //         method: 'GET',
    //         url: '/api/getCurrentTest'
    //     }).success(function (data) {
    //         console.log(data);
    //         $scope.challenge = data.challenge;
    //         $scope.currentQID = 0;
    //         $('.preloader-background').fadeOut('slow');
    //         // checking the response data for statusCode
    //         if (data.testId != null) {
    //             //window.location.assign("/levels");
    //             console.log(data);
    //             $scope.challenge = data.challenge;
    //             $scope.currentQ = $scope.challenge[0].question;
    //             $scope.currentQID = 1;
    //
    //         } else if (data.Status == 401) {
    //             $scope.inval_mess = data.Message;
    //         }
    //         else {
    //             $scope.inval_mess = "An unexpected error occured. Try again.";
    //         }
    //     }).error(function (error) {
    //         $scope.inval_mess = "An unexpected error occured. Try again.";
    //     });
    // };
    // fetchQuestions();
});