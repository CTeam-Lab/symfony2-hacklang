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

require(['angular', './App.module', './App.configuration'], (angular: ng.IAngularStatic, App: any, AppConfiguration: any) => {
  angular.element(document).ready(() => {
    (<any>new App('ctApp', '/')).bootstrap();
  });
});
