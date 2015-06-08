(function() {
  'use strict';

  angular
    .module('ctApp', [
      'ctSeo',
      'ctHeader',
      'ctFooter',
      'ctPost',
      'ctFollowUs',
      'ngMaterial'
    ])
    .config(['$mdThemingProvider', function($mdThemingProvider) {
      // https://material.angularjs.org/latest/#/Theming/03_configuring_a_theme
      $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('blue-grey')
        .warnPalette('red')
        .backgroundPalette('grey');

      // https://www.google.com/design/spec/components/buttons-floating-action-button.html#buttons-floating-action-button-large-screens
    }]);
}).call();
