(function() {

	var MainController = function($scope, $q) {
		
		var sayHello = function() {

			var deffered = $q.defer();

			setTimeout(function() {
				
				deffered.resolve('Hello');

			}, 1000);

			return deffered.promise;
		}

		sayHello().then(function(data) {
			alert(data)
		})

	}


	angular
		.module('App', ['ngRoute'])
		.controller('MainController', MainController);

})();