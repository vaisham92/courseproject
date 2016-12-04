binary.controller('practiceController', function ($scope, $http, $routeParams) {

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
            binary += "0";
        }
        else if(!$scope.isFlipped7) {
            binary += "1";
        }
        if($scope.isFlipped6) {
            binary += "0";
        }
        else if(!$scope.isFlipped6) {
            binary += "1";
        }
        if($scope.isFlipped5) {
            binary += "0";
        }
        else if(!$scope.isFlipped5) {
            binary += "1";
        }
        if($scope.isFlipped4) {
            binary += "0";
        }
        else if(!$scope.isFlipped4) {
            binary += "1";
        }
        if($scope.isFlipped3) {
            binary += "0";
        }
        else if(!$scope.isFlipped3) {
            binary += "1";
        }
        if($scope.isFlipped2) {
            binary += "0";
        }
        else if(!$scope.isFlipped2) {
            binary += "1";
        }
        if($scope.isFlipped1) {
            binary += "0";
        }
        else if(!$scope.isFlipped1) {
            binary += "1";
        }
        if($scope.isFlipped0) {
            binary += "0";
            success(binary);
        }
        else if(!$scope.isFlipped0) {
            binary += "1";
            success(binary);
        }
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

    var dec2bin = function(dec){
        return (dec >>> 0).toString(2);
    };

    var generateRandomNumber = function() {
        return Math.floor((Math.random() * 100) + 1);
    };

    var firstLoad = function() {
        var randomNumber = generateRandomNumber();
        $scope.currentQ = randomNumber;
        resetFlip();
        $('.preloader-background').fadeOut('slow');
    };
    firstLoad();
    $scope.submit = function() {
        $('.preloader-background').fadeIn('slow');
        fetchTheBinaryNumber(function(binaryAns) {
            if($scope.currentQ == parseInt( binaryAns, 2 )) {
                //alert("yes");
                var randomNumber = generateRandomNumber();
                $scope.currentQ = randomNumber;
                resetFlip();
                $('.preloader-background').fadeOut('slow');
            }
            else {
                alert("no");
                $('.preloader-background').fadeOut('slow');
            }
        });

        
    };
});