'use strict';

/**
 * @ngdoc overview
 * @name moltinApp
 * @description
 * # moltinApp
 *
 * Main module of the application.
 */
angular
  .module('moltinApp', [
    'moltinApp.moltin',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/store', {
        templateUrl: 'views/store.html',
        controller: 'StoreCtrl',
        controllerAs: 'store',
        resolve: {
          categories: function($q, MoltinAuth) {
            var deferred = $q.defer();
            $q.when(MoltinAuth).then(function(moltin) {
              moltin.Category.List(null, function(categories) {
                deferred.resolve(categories);
              });
            })
            return deferred.promise;
          }
        }
      })
      .when('/category/:id', {
        templateUrl: 'views/category.html',
        controller: 'CategoryCtrl',
        controllerAs: 'category',
        resolve: {
          categories: function($q, $route, MoltinAuth) {
            var deferred = $q.defer();
            $q.when(MoltinAuth).then(function(moltin) {
              moltin.Category.Get($route.current.params.id, function(categories) {
                deferred.resolve(categories);
              });
            })
            return deferred.promise;
          },
          products: function($q, $route, MoltinAuth) {
            var deferred = $q.defer();
            $q.when(MoltinAuth).then(function(moltin) {
              moltin.Product.List({category: $route.current.params.id}, function(products) {
                deferred.resolve(products);
              });
            })
            return deferred.promise;
          }
        }
      })
      .when('/product/:id', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl',
        controllerAs: 'product',
        resolve: {
          product: function($q, $route, MoltinAuth) {
              var deferred = $q.defer();
              $q.when(MoltinAuth).then(function(moltin) {
                moltin.Product.Get($route.current.params.id, function(product) {
                  deferred.resolve(product);
                });
              })
              return deferred.promise;
            },
            moltin: function($q, MoltinAuth) {
              return MoltinAuth;
            }
          }
      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'CartCtrl',
        controllerAs: 'cart'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
