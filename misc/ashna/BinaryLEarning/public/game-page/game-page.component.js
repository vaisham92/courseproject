angular.module('homePage').component('homePage', {
        templateUrl: 'app/home-page/home-page.template.html',
        controller: function homePageController($scope, $http, $route,$rootScope,$cookieStore,$cookies) {

        	if ($route.current.$$route.data == 100){
        		$scope.invalid_order = false;
        		$route.current.$$route.data == 0;
        	}else{
        		$scope.invalid_order = true;
        	}
        	
        	getSession();
        	function getSession(){
	        	  $http({
	                    method: "GET",
	                    url: '/getSession'
	                }).success(function(data) {
	                    //checking the response data for statusCode
	                    if (data.statusCode == 200) {
	                    	console.log("session exists");
	                    	//getProfile();
	                    	getAds();
	                    	
	                    } else {
	                    	
	                    	window.location.assign("/"); 
	                    }
	                    //Making a get call to the '/redirectToHomepage' API
	                    //window.location.assign("/homepage"); 
	                }).error(function(error) {
	                    $scope.validlogin = true;
	                    $scope.invalid_login = true;
	                });
	          }
        	$scope.profile = $cookieStore.get('profile');
    		console.log($scope.profile);
   		$scope.profile.lastLog_date = new Date($scope.profile.lastLog_date);
   		console.log($scope.profile);
   		if ($route.current.$$route.data == 101){

    		$scope.lastLoggedIn = false;
    		$route.current.$$route.data == 0;
    		$scope.lastLoggedInDate = new Date($scope.profile.lastLog_date);
    	}
    	else{
    		$scope.lastLoggedIn = true;
    		
    	}
        	$rootScope.profile = $cookieStore.get('profile');
        	$scope.username  = $scope.profile.first_name;
        	$scope.invalid_order =true;

        	
            function getProfile(){
                var usrId = $scope.profile.user_id;
                console.log(usrId);
                $http({
                    method: "POST",
                    url: '/getProfile',
                    data: {
                        "user_id": usrId
                    }
                }).success(function(data) {
                    //checking the response data for statusCode
                    if (data.statusCode == 200) {
                    	console.log(data.profile.quant);
                    	$scope.profile = data.profile;
                    	$rootScope.profile = data.profile;
                    	console.log($rootScope.profile.cart_quant);
                    } else {
                    	$scope.invalid_login = false;
                        console.log(data.statusCode);
                    }
                    //Making a get call to the '/redirectToHomepage' API
                    //window.location.assign("/homepage"); 
                }).error(function(error) {
                    $scope.validlogin = true;
                    $scope.invalid_login = true;
                });
            }	;	
        	
        	
        	function getAds(){
                var usrId = $scope.profile.user_id;
                console.log(usrId);
                $http({
                    method: "POST",
                    url: '/getAllAdv',
                    data: {
                        "user_id": usrId
                    }
                }).success(function(data) {
                    //checking the response data for statusCode
                    if (data.statusCode == 200) {
                    	console.log(data);
                    	$scope.Ads =[];
                    	$scope.Ads = data.allAds;
                    } else {
                    	$scope.invalid_login = false;
                        console.log(data.statusCode);
                    }
                    //Making a get call to the '/redirectToHomepage' API
                    //window.location.assign("/homepage"); 
                }).error(function(error) {
                    $scope.validlogin = true;
                    $scope.invalid_login = true;
                });
            }	;	
            
        	//$scope.username = $cookies.profile.first_name;
            
	            $scope.addToCart = function(adv,quant) {
	            	console.log(adv,quant);
	            	
	            	$http({
	                    method: "POST",
	                    url: '/addToCart',
	                    data: {
	                        "adv_id": adv.adv_id,
	                        "quant": quant,
	                        "user_id": this.profile.user_id,
	                        "price":adv.item_price,
	                        "name":adv.item_name,
	                        "desc":adv.item_desc
	                        
	                    }
	                }).success(function(data) {
	                	console.log($rootScope);


		                 console.log("add to cart");
		                	getProfile();
	                	//Making a get call to the '/redirectToHomepage' API
	                    //window.location.assign("/homepage"); 
	                }).error(function(error) {
	                    
	                });
	            }
	          
                
	           
            
        }
    })
