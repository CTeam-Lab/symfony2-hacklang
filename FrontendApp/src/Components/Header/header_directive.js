(function() {
  'use strict';

  angular
    .module('ctHeader')
    .directive('ctHeader', ['$mdSidenav', ctHeaderDirective]);

  function ctHeaderDirective($mdSidenav) {
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
      scope.ctHeader.menu = {
        sections: [
          {
            type: 'toggle',
            label: 'Blog',
            pages: [
              {
                type: 'link',
                href: '/blog/php',
                label: 'PHP'
              }
            ]
          },
          {
            type: 'link',
            href: '/about',
            label: 'About'
          },
          {
            type: 'link',
            href: '/contact',
            label: 'Contact Us'
          }
        ]
      };
    }
  }
}).call();
