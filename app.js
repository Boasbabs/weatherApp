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

	this.city = "London, UK";
});

// CONTROLLERS
weatherApp.controller("mainController", ["$scope", "cityService", function ($scope, cityService) {

	$scope.city = cityService.city;

	$scope.$watch("city", function () {
		cityService.city = $scope.city;
	});
}]);
weatherApp.controller("forecastController", ["$scope", "$resource", "cityService", function($scope, $resource, cityService) {
	$scope.city = cityService.city;

	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/city?q=London&APPID=27d43832d2a4adcb97fcbfa23db130aa", {
		callback: "JSON_CALLBACK"}, { get: { method: "JSONP"}});

	$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 5});

	console.log($scope.weatherResult);
}]);