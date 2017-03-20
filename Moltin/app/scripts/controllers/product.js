'use strict';

/**
 * @ngdoc function
 * @name moltinApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the moltinApp
 */
angular.module('moltinApp')
  .controller('ProductCtrl', function ($scope, product, moltin, $timeout) {
    $scope.product = product;
    $scope.addStatus = null;

    $scope.addCart = function() {
    	$scope.addStatus = 'Adding to cart..';
    	moltin.Cart.Insert(product.id, 1, null, function() {
    		$scope.addStatus = "Success!";
    		$scope.$apply();
    		$timeout(function() {
    			$scope.addStatus = null;
    		}, 1000);
    	});
    }
    console.log(product);
  });
