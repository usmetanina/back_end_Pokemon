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
  $http.get('/?controller=user')
  .success(function(data) {
    $scope.users = data;
  })
}
)

.factory("Game", function() {
  var score = 0;
  function setScore(value) {
    score=value;
  };
  function getScore() {
    return score
  };

  return {
    getScore: getScore,
    setScore:setScore
  };
})

.controller("gameplayController", function($scope,$log,$rootScope, $http, $location, Game){
	$scope.score=Game.getScore();
  	$scope.health = 100;
  	$scope.time = 0;
	$scope.level=1;

  $http.get('/?controller=pokemon&id=0')
  .success(function(data) {
    $scope.currentPokemon = data;
  })

  	$scope.sendData=function()
	{
		if ($scope.acquaintance.username.$modelValue == null)
			$window.alert("Заполните имя :) ");
		else
		{
			$http.post('/?controller=user', {name: $scope.acquaintance.username.$modelValue, score: Game.getScore()})
			.success(function () {
				$location.path('/page/3');
			});
		}
	}
}
)

.directive("menu", function(){
	return {
		templateUrl:"assets/directives/menu.html",
		replace: true,
		restrict: 'E',

	controller: function($scope,$log,$rootScope, $http){

  		$http.get('/?controller=menu')
			.success(function(data) {
  				$scope.menu=data;
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

	controller: function($scope,$log,$rootScope, $http,$interval, $location, Game){
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
		if ($scope.level==3 || $scope.health <= 0)
		{
			$scope.endOfGame();
		} 

		Game.setScore(parseInt(Game.getScore()) + parseInt($scope.currentPokemon.power)*($scope.timePassed));

		$http.get('?controller=pokemon&id='+parseInt($scope.level))
			.success(function(data) {
  				$scope.currentPokemon=data;
  			})

			$scope.level++;
		$interval.cancel(timer);
	};

	$scope.endOfGame=function(){
		$location.path('/page/5');
	}
	}
	}
})