//MODULE
var weatherApp = angular.module("weatherApp",["ngRoute", "ngResource"]);

//ROUTES
weatherApp.config(function($routeProvider) {
	$routeProvider

	.when("/", {
		templateUrl: "pages/main.html",
		controller: "mainController"
	})
	.when("/forecast", {
		templateUrl: "pages/forecast.html",
		controller: "forecastController"
	})
	.when("/forecast/:days", {
		templateUrl: "pages/forecast.html",
		controller: "forecastController"
	})
});
// SERVICES
weatherApp.service("cityService", function() {

	this.city = "";
});

// CONTROLLERS
weatherApp.controller("mainController", ["$scope", "cityService", function ($scope, cityService) {

	$scope.city = cityService.city;

	$scope.$watch("city", function () {
		cityService.city = $scope.city;
	});
}]);
weatherApp.controller("forecastController", ["$scope", "$resource", "$routeParams", "cityService", function($scope, $resource, $routeParams, cityService) {
	$scope.city = cityService.city;

	$scope.days = $routeParams.days || "2";

	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?&APPID=27d43832d2a4adcb97fcbfa23db130aa", {
		callback: "JSON_CALLBACK"}, { get: { method: "JSONP"}});

	$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days});

	$scope.convertToCelsius = function(degK) {
		return Math.round(degK - 273.15);
		// this is for FAHRENHEIT return Math.round((1.8 * (degK - 273)) + 32);
	};
	$scope.convertToDate = function(dt) {
		return new Date(dt * 1000);
	}

	console.log($scope.weatherResult);
}]);

// DIRECTIVES
weatherApp.directive("weatherReport", function() {
	return 	{
		restrict: "E",
		templateUrl: "directives/weatherReport.html",
		replace: true,
		scope:  {
			weatherDay: "=",
			convertToStandard: "&",
			convertToDate: "&",
			dateFormat: "@"
		}
	}
});