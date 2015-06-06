(function() {
  'use strict';

  angular
    .module('comments')
    .directive('ctComments', ctCommentsDirective);

  function ctCommentsDirective() {
    return {
      restrict: 'E',
      templateUrl: 'Components/Comments/comments.html',
      scope: {},
      bindToController: true,
      controllerAs: '',
      controller: 'CommentsController',
      link: link
    };

    function link(scope, element, attributes) {

    }
  }
}).call();
