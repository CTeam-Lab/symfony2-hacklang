(function() {
  'use strict';

  angular
    .module('followUs')
    .directive('ctFollowUs', ctFollowUsDirective);

  function ctFollowUsDirective() {
    return {
      restrict: 'E',
      templateUrl: '',
      scope: {},
      bindToController: true,
      controller: 'FollowUsController',
      controllerAs: '',
      link: link
    };

    function link(scope, element, attributes) {

    }
  }
}).call();
