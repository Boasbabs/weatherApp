//MODULE
var weatherApp = angular.module("weatherApp",["ngRoute", "ngResource"]);

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
});

weatherApp.controller("mainController", ["$scope", function ($scope) {
	//$scope.name = "John Doe";
}]);
weatherApp.controller("forecastController", ["$scope", function ($scope) {
	//$scope.name = "Forecast Details";
}]);