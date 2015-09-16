/// <reference path="./_all.d.ts"/>

require.config({
  paths: {
    'angular': '../dist/angular/angular',
    'angular-ui-router': '../dist/angular-ui-router/angular-ui-router'
  },

  shim: {
    'angular': {
      exports: 'angular'
    },
    'angular-ui-router': ['angular']
  }
});

require(['angular', 'App.module'], (angular: ng.IAngularStatic) => {
  angular.element(document).ready(() => {
    angular.bootstrap(document, ['ctApp']);
  });
});
