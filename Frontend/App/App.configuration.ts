/// <reference path="./_all.d.ts" />

/// <amd-dependency path="angular" />

import {ILocationProvider} from 'angular';
import RouterConfiguration from './Core/Router.configuration';

class AppConfiguration extends RouterConfiguration {
  public static $inject: string[] = [
    '$locationProvider',
    '$urlRouterProvider',
    '$stateProvider'
  ];

  constructor(
    protected $locationProvider: ILocationProvider,
    protected $urlRouterProvider: ng.ui.IUrlRouterProvider,
    $stateProvider: ng.ui.IStateProvider
  ) {
    super($stateProvider);

    /**
     * NOTE if we want to enable HTML5 mode
     * Requires Server side URL rewrite (http://stackoverflow.com/questions/16569841/angularjs-html5-mode-reloading-the-page-gives-wrong-get-request)
     */
    // this.$locationProvider.html5Mode(true).hashPrefix('!');

    this.$stateProvider
      .state('home', {
        url: '/'
      });

    this.$urlRouterProvider
      .when('', '/')
      .otherwise('/');
  }
}

export default AppConfiguration;
