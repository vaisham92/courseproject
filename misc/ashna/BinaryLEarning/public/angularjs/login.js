var loginApp = angular.module('login', []).
  directive('tabs', function() {
    return {
      transclude: true,//to be able to pass in an entire template rather than a string or an object
      restrict: 'E', //'E' - only matches element name
      scope: {},
      controller: [ "$scope", function($scope) {
        var panes = $scope.panes = [];
 
        $scope.select = function(pane1) {
        	console.log("inside "+pane1.title);
          angular.forEach(panes, function(pane) {
        	  pane.selected=false;
        	 console.log(pane.title);
//             if(pane === pane1)
//            	 {
//            	 console.log(pane.title);
//            	 pane.selected=true;
//            	 }
//             else
//            	 pane.selected=false;
          });
          pane1.selected = true;
        }
        
        
        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      }],
      template:
        '<div class="tabbable">' +
          '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
              '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' +
        '</div>',
      replace: true
    };
  }).
  directive('pane', function() {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: { title: '@' },
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
  })
.controller ('loginCtrl',['$scope',function($scope,$http){
	  
	  this.signin = function(){
			console.log("here" );
			var usr = this.username;
			var pwd = this.password;
			console.log(usr);
			console.log(pwd);
			
			$http({
				method : "POST",
				url : '/login',
				data : {
					"username" : $scope.username,
					"password" : $scope.password
				}
			}).success(function(data) {
				//checking the response data for statusCode
				if (data.statusCode == 401) {
					$scope.invalid_login = false;
					$scope.validlogin = true;
				}
				else
					{
					$scope.validlogin = false;
					$scope.invalid_login = true;
					}
					//Making a get call to the '/redirectToHomepage' API
					//window.location.assign("/homepage"); 
			}).error(function(error) {
				$scope.validlogin = true;
				$scope.invalid_login = true;
			});
		}
	  
	  this.signup = function(){
			console.log("here" );
			var email = this.email;
			var password = this.password;
			console.log(email);
			console.log(password);
		}
	  
  }]);

  