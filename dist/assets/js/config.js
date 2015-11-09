// inisialisasi angular js
angular

// inisialisasi modul dengan nama pos-config dan dependencies ngRoute
.module('pos-config', ['ngRoute'])

// membuat global variable dengan nama WS dalam bentuk array dengan isi url = ...
.constant('WS', {
	url: 'https://blistering-inferno-1924.firebaseio.com/'
})

// mebuat configurasi untuk route url
.config(['$routeProvider', function($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'templates/dashboard.html',
			controller: 'MainController'
		})
		.when('/sell', {
			templateUrl: 'templates/sell.html',
			controller: 'SellController'
		})
		.when('/product', {
			templateUrl: 'templates/product.html',
			controller: 'ProductController'
		})
		.when('/order/:id', {
			templateUrl: 'templates/order-detail.html',
			controller: 'OrderController'
		})
		.otherwise({
			redirectTo: '/'
		})

}])


.filter('toArray', function () {
	return function (obj, addKey) {
		if (!angular.isObject(obj))
			return obj;
		if (addKey === false) {
			return Object.keys(obj).map(function (key) {
				return obj[key];
			});
		} else {
			return Object.keys(obj).map(function (key) {
				var value = obj[key];
				return angular.isObject(value) ?
						Object.defineProperty(value, '$key', {enumerable: false, value: key}) :
						{$key: key, $value: value};
			});
		}
	};
});
