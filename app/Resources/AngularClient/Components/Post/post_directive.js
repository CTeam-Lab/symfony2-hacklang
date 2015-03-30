(function() {
  'use strict';

  angular
    .module('post')
    .directive('ctPost', ctPostDirective);

  function ctPostDirective() {
    return {
      restrict: 'E',
      templateUrl: 'Components/Post/post.html',
      scope: {},
      bindToController: true,
      controller: 'PostController',
      controllerAs: '',
      link: link
    };

    function link(scope, element, attributes) {

    }
  }
}).call();
