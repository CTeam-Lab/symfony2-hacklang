(function() {
  'use strict';

  angular
    .module('ctFollowUs')
    .directive('ctFollowUs', ctFollowUsDirective);

  function ctFollowUsDirective() {
    return {
      restrict: 'E',
      templateUrl: '',
      scope: {},
      bindToController: true,
      controller: 'FollowUsController',
      controllerAs: 'ctFollowUs',
      link: link
    };

    function link(scope, element, attributes) {

    }
  }
}).call();
