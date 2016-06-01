// SERVICES
weatherApp.service("cityService", function() {

	this.city = "";
});

weatherApp.service("weatherService", ["$resource", function($resource) {
	
	this.GetWeather = function(city, days) {
		var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?&APPID=27d43832d2a4adcb97fcbfa23db130aa", {
		callback: "JSON_CALLBACK"}, { get: { method: "JSONP"}});

		return weatherAPI.get({ q: city, cnt: days});
	}

}]);