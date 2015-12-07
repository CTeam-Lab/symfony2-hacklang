/// <reference path="../../_all.d.ts"/>

/// <amd-dependency path="angular" />

var angular: ng.IAngularStatic = require('angular');

export var moduleName:string = 'ctHomepage';

export var HomepageModule: ng.IModule = angular.module(moduleName, []);
