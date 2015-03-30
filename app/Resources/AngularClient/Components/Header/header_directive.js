(function() {
  'use strict';

  angular
    .module('header')
    .directive('ctHeader', ctHeaderDirective);

  function ctHeaderDirective() {
    return {
      restrict: 'E',
      templateUrl: 'Components/Header/header.html',
      scope: {},
      bindToController: true,
      controller: 'HeaderController',
      controllerAs: 'ctHeader',
      link: link
    };

    function link(scope, element, attributes) {

    }
  }
}).call();
