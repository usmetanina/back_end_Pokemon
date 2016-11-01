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
.controller("pagesController",function($scope,$log,$rootScope,$routeParams){
	$scope.page=parseInt($routeParams.id) || 0;
})


.controller("userController", function($scope,$log,$rootScope, $http){
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
	$rootScope.score=0;
  	$scope.health = 100;
  	$scope.time = 0;
	$scope.level=1;

  $http.get('http://localhost/?controller=pokemon&id=0')
  .success(function(data, status, headers, config) {
    $scope.currentPokemon = data;
    $log.log($scope.currentPokemon);
	$log.log("всё ок: " +status);
    $log.log("длина: " + headers("content-length"));
  })
  .error(function(data, status, headers, config){
	  $log.log("не ок: " +status);
})
}
)


.controller("senderController", function($scope,$log,$rootScope, $http, $window){
$log.log($rootScope.score);
	$scope.sendData=function()
	{

		$log.log($scope.score);
		$log.log($scope.acquaintance.username.$modelValue);
		if ($scope.acquaintance.username.$modelValue == null)
			$window.alert("Заполните имя :)");
		$http({
	    	method: 'POST',
	    	url: 'http://localhost/?controller=user',
    		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    		
    		transformRequest: function(obj) {
        	var str = [];
        	for(var p in obj)
        	str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        	return str.join("&");
    		},
    
    		data: {name: $scope.acquaintance.username.$modelValue, score: $rootScope.score}
		
		})
		.success(function (data) {
			$log.log("ок");
        	$log.log(data);
        	document.location.href='#/page/3';
		});
	}
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

.directive("pokemon", function(){
	return {
		templateUrl:"assets/directives/pokemon.html",
		replace: true,
		restrict: 'E',

	controller: function($scope,$log,$rootScope, $http,$interval){
  		var timer;
  		var tic =0;
  		$scope.ballPos={'X':0,'Y':0};

  		$scope.startMove=function(){

  			var start = Date.now();
  			timer = $interval(function() {
  			
  			$scope.timePassed = parseInt(10-(Date.now() - start)/1000);

  			if ($scope.timePassed <=0) {
    			clearInterval(timer);
    			$scope.nextLevel();
    			$scope.health = parseInt($scope.health) - parseInt($scope.currentPokemon.power);
    			start = Date.now();
  			}
			
  			draw();

		}, 50);	
	};

	function draw() {
  			tic++;
			$scope.ballPos.X=40*Math.sin(tic/100);
			$scope.ballPos.Y=50*Math.cos(tic/100);

	}

	$scope.nextLevel=function(){

		$log.log("текуший покемон "+$scope.currentPokemon);
		if ($scope.level==3 || $scope.health <= 0)
		{
			$scope.endOfGame();
		} 

		$rootScope.score = parseInt($rootScope.score) + parseInt($scope.currentPokemon.power)*($scope.timePassed);

		$http.get('http://localhost/?controller=pokemon&id='+parseInt($scope.level))
			.success(function(data, status, headers, config) {
  				$scope.currentPokemon=data;
  				$log.log($scope.currentPokemon);
				$log.log("всё ок: " +status);
    			$log.log("длина: " + headers("content-length"));
  			})
  			.error(function(data, status, headers, config){
	  			$log.log("не ок: " +status);
			})

			$scope.level++;
		$interval.cancel(timer);
	};

	$scope.endOfGame=function(){
		document.location.href='#/page/5';
	}
	}
	}
})