angular
.module('POS', ['pos-config'])
.directive('orderList', [function () {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {
			// console.log(scope);
		}
	};
}])
.factory('$posProduct', ['$http', 'WS', function ($http, WS) {
	return {
		get: function() {
			return $http.get(WS.url + 'product.json');
		},
		add: function(data) {
			return $http.post(WS.url + 'product.json', {
				name: data.name,
				price: data.price
			});
		},
		destroy: function(id) {
			return $http({
				url: WS.url + 'product/' + id + '.json',
				method: "DELETE",
			})
		}
	};
}])
.factory('$posOrder', function($http, WS) {
	return {
		save: function(orders) {
			return $http.post(WS.url + 'order.json', orders);
		},
		fetchAll: function() {
			return $http.get(WS.url + 'order.json');
		},
		getById: function(id) {
			return $http.get(WS.url + 'order/' + id + '.json');
		}
	}
})
.factory('$productFactory', ['$posProduct', function ($posProduct) {
	return {
		getAllProducts: function() {
			return $posProduct.get();
		}
	};
}])
.controller('MainController', ['$scope', '$posOrder', function ($scope, $posOrder) {

	$posOrder.fetchAll().then(function(result) {
		$scope.orders = result.data;
	}) 
}])
.controller('SellController', ['$scope', '$productFactory', '$posOrder', function ($scope, $productFactory, $posOrder) {
	$scope.orders = [];
	$scope.products = [];
	$scope.total = 0;

	$scope.addToBasket = function($p) {

		var count = 1;

		var pos = $scope.orders.map(function(x) {return x.id; }).indexOf($p.id);

		if ( pos != -1 ) {
			$scope.orders[pos].qty += count++;

		} else {
			$scope.orders.push({
				id: $p.id,
				name: $p.name,
				price: $p.price,
				qty: count
			});
		}

		$scope.total += parseInt($p.price);

		showResponse($p.name + ' added to basket', 'success');
	}

	var showResponse = function(message, type) {

		$scope.response = {
			message: message,
			type: type
		}

		if ( $scope.timer ) {
			clearTimeout($scope.timer);
			$scope.timer = null;
		}

		$scope.timer = setTimeout(function() {
			$scope.$apply(function(scope) {
				scope.response = {};
			});
		}, 2000);
	}

	var onGetProductsSuccess = function(result) {
		angular.forEach(result.data, function(v, i) {
			$scope.products.push({
				id: i,
				name: v.name,
				price: v.price,
			});
		});
	}

	$scope.saveOrders = function() {

		$posOrder.save({
			items: $scope.orders,
			total: $scope.total  
		}).then(function(result) {

			showResponse('Order ' + result.data.name + ' has been saved.', 'success');

			$scope.orders = [];
		})
	}

	$scope.getAllProducts = function() {
		$productFactory.getAllProducts().then(onGetProductsSuccess);
	}
}])
.controller('ProductController', ['$scope', 'WS', '$posProduct', '$posOrder', function ($scope, WS, $posProduct, $posOrder) {

	$scope.products = [];
	$scope.orders = [];
	$scope.timer = null;
	$scope.counter = 0;
	$scope.searchText = [];

	$scope.getAllProducts = function() {
		$scope.products = [];
		$posProduct.get().then(onGetProductsSuccess);
	}

	$scope.addProduct = function() {
		$posProduct.add($scope.product).then(onAddProductSuccess);
	}

	var onAddProductSuccess = function(result) {
		$scope.response = result;
//		$scope.products.push({
//			name: $scope.product.name,
//			price: $scope.product.price,
//			id: result.data.name
//		});
		$scope.getAllProducts();
		$scope.product = {};
	}

	var onGetProductsSuccess = function(result) {
//		angular.forEach(result.data, function(v, i) {
//			$scope.products.push({
//				id: i,
//				name: v.name,
//				price: v.price,
//			});
//		});
		$scope.products = result.data;
	}

	$scope.removeFromBasket = function(id, idx) {
		console.log(id, idx)
		$posProduct.destroy(id).then(function() {
			//$scope.products.splice(idx, 1);
			$scope.getAllProducts();
		})
	}
	
}])
.controller('OrderController', ['$scope', '$route', '$posOrder', function ($scope, $routeParams, $posOrder) {
	$scope.params = $routeParams;
	$scope.orders = [];

	$posOrder.getById($scope.params.current.params.id).then(function(result) {
		$scope.orders = result.data;
	})
}])