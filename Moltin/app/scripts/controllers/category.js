'use strict';

/**
 * @ngdoc function
 * @name moltinApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the moltinApp
 */
angular.module('moltinApp')
  .controller('CategoryCtrl', function ($scope, category, products) {
    this.category = category;
    this.products = products;
  });
