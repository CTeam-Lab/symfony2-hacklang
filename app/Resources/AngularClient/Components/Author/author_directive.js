(function() {
  'use strict';

  angular
    .module('author')
    .directive('ctAuthor', ctAuthorDirective);

  function ctAuthorDirective() {
    return {
      restrict: 'E',
      templateUrl: 'Components/Author/author.html',
      scope: {},
      bindToController: true,
      controllerAs: '',
      controller: 'AuthorController',
      link: link
    };

    function link(scope, element, attributes) {

    }
  }
}).call();
