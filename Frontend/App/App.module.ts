/// <reference path="./_all.d.ts" />

/// <amd-dependency path="angular" />
/// <amd-dependency path="angular-ui-router" />
/// <amd-dependency path="./Templates/Templates" />

import {moduleName as ViewsModuleName} from './Views/Views.module';
import {moduleName as ComponentsModuleName} from './Components/Components.module';

var angular = require('angular');

export var AppModule: ng.IModule = angular
  .module('ctApp', ['ui.router', 'ctTemplates', ViewsModuleName, ComponentsModuleName])
  .config(['$locationProvider', '$urlRouterProvider', ($locationProvider: ng.ILocationProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider
      .when('', '/')
      .otherwise('/');
  }])
  .run(['$rootScope', ($rootScope: ng.IRootScopeService) => {
  }]);
