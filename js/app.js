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
	$log.log("pagesController"+ $scope.page);
})


.controller("userController", function($scope,$log,$rootScope, $http ,$routeParams){
	$log.log($scope.page);
	 $log.log($routeParams.id);
  $http.get('http://localhost/?controller=user')
  .success(function(data, status, headers, config) {
    $scope.users = data;
	$log.log("всё ок: " +status);
    $log.log("длина: " + headers("content-length"));
  })
  .error(function(data, status, headers, config){
	  $log.log("не ок: " +status);
})
}
)

.controller("gameplayController", function($scope,$log,$rootScope, $http){

  	$scope.health = 100;
  	$scope.time = 0;
  	var time, tic =0;
	$scope.ballPos={'X':0,'Y':0};

  $http.get('http://localhost/?controller=pokemon')
  .success(function(data, status, headers, config) {
    $scope.pokemons = data;
	$log.log("всё ок: " +status);
    $log.log("длина: " + headers("content-length"));
  })
  .error(function(data, status, headers, config){
	  $log.log("не ок: " +status);
})

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
}
)


.directive("menu", function(){
	return {
		templateUrl:"assets/directives/menu.html",
		replace: true,
		restrict: 'E',

	controller: function($scope,$log,$rootScope, $http){

  		$http.get('http://localhost/?controller=menu')
			.success(function(data, status, headers, config) {
  				$scope.menu=data;
				$log.log("всё ок: " +status);
    			$log.log("длина: " + headers("content-length"));
  			})
  			.error(function(data, status, headers, config){
	  			$log.log("не ок: " +status);
			})

 		 $scope.getClass=function($item){
  			if ($scope.page-1==$item)
  				return ("mainmenu__item mainmenu__item__active");
  			else 
  				return ("mainmenu__item");
  		};
	}
	}
})
/*
.filter('plus', function(){
     return function(param){
        // íåêîòîðûå äåéñòâèÿ íàä param
        return param+'+1'; 
    }
}))*/