'use strict';

/**
 * @ngdoc function
 * @name moltinApp.controller:StoreCtrl
 * @description
 * # StoreCtrl
 * Controller of the moltinApp
 */
angular.module('moltinApp')
  .controller('StoreCtrl', function ($scope, categories) {
    $scope.categories = categories;
    ];
  });
