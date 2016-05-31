//MODULE
var weatherApp = angular.module("weatherApp",["ngRoute", "ngResource"]);

// ROUTES
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
// SERVICES
weatherApp.service("cityService", function() {

	this.city = "New York, NY";
});

// CONTROLLERS
weatherApp.controller("mainController", ["$scope", "cityService", function ($scope, cityService) {

	$scope.city = cityService.city;

	$scope.$watch("city", function () {
		cityService.city = $scope.city;
	});
}]);
weatherApp.controller("forecastController", ["$scope", "cityService", function($scope, cityService) {
	$scope.city = cityService.city;
}]);