/// <reference path="../_all.d.ts"/>

/// <amd-dependency path="angular" />

import {moduleName as HomepageModuleName} from './Homepage/Homepage.module';

var angular: ng.IAngularStatic = require('angular');

export var moduleName:string = 'ctViews';

export var ViewsModule: ng.IModule = angular.module(moduleName, [
  HomepageModuleName
]);
