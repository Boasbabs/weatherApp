// CONTROLLERS
weatherApp.controller("mainController", ["$scope", "$location", "cityService", function ($scope, $location,cityService) {

	$scope.city = cityService.city;

	$scope.$watch("city", function () {
		cityService.city = $scope.city;
	});

	$scope.submit = function() {
		$location.path("/forecast");
	}
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