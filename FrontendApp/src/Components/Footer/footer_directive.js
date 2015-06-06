(function() {
  'use strict';

  angular
    .module('ctFooter')
    .directive('ctFooter', ctFooterDirective);

  function ctFooterDirective() {
    return {
      restrict: 'E',
      templateUrl: 'Components/Footer/footer.html',
      scope: {},
      bindToController: true,
      controller: 'FooterController',
      controllerAs: 'ctFooter',
      link: link
    };

    function link(scope, element, attributes) {

    }
  }
}).call();
