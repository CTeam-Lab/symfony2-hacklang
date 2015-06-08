(function() {
  'use strict';

  angular
    .module('ctPost')
    .directive('ctPost', ctPostDirective);

  function ctPostDirective() {
    return {
      restrict: 'EA',
      templateUrl: 'Components/Post/post.html',
      scope: {},
      bindToController: true,
      controller: 'PostController',
      controllerAs: 'ctPost',
      link: link
    };

    function link(scope, element, attributes) {

    }
  }
}).call();
