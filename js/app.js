"use strict";

var app = angular.module("game", ["ngRoute", "ngResource"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/page/:id", {
        templateUrl : function(page){
        	return "assets/page-"+page.id+".html"
        },
        controller: "pagesController"
    })
    .otherwise("/page/0");
})
.controller("pagesController",function($scope,$log,$rootScope,$routeParams,$interval){
	$scope.page=parseInt($routeParams.id) || 0;
	};

	$scope.start=function(){
		
		tictac=$interval(function(){
			tic++;
			$scope.ballPos.X=50*Math.sin(tic/50);
			$scope.ballPos.Y=20*Math.cos(tic/20);
		},50);	
	};
	$scope.stop=function(){
		$interval.cancel(tictac);
	};
	
})

.controller("menuController", function($scope,$log,$rootScope, $http){
  $http.get('http://localhost/?controller=menu')
  .success(function(data, status, headers, config) {
    $scope.menu = data;
	console.log("код ответа: " +status);
    console.log("объем данных: " + headers("content-length"));
  })
  .error(function(data, status, headers, config){
	  console.log("код ответа: " +status);
})
}
)

.controller("userController", function($scope,$log,$rootScope, $http){
  $http.get('http://localhost/?controller=user')
  .success(function(data, status, headers, config) {
    $scope.users = data;
	console.log("код ответа: " +status);
    console.log("объем данных: " + headers("content-length"));
  })
  .error(function(data, status, headers, config){
	  console.log("код ответа: " +status);
})
}
)

.directive("menu", function(){
	return {
		templateUrl:"assets/directives/menu.html",
		replace: true,
		restrict: 'E',
		scope:{
			current:'='
		},
		controller: function($scope){
			/*$scope.nextPage=function(){
				var next= 1+parseInt($scope.current);
			return next;
			};
			$scope.prevPage=function(){
				var prev= ($scope.current>0 ) ? parseInt($scope.current)-1 : 0;
			return prev;
			};	*/	
		}
	}
})
/*
.filter('plus', function(){
     return function(param){
        // некоторые действия над param
        return param+'+1';
    }
}))*/