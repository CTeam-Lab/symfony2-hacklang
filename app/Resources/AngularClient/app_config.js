(function() {
  'use strict';

  angular
    .module('app')
    .config([
      '$routeProvider',
      '$locationProvider',
      AppConfig
    ]);

  function AppConfig($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  }
}).call();
