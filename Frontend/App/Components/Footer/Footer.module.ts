/// <reference path="../../_all.d.ts"/>

/// <amd-dependency path="angular" />

var angular: ng.IAngularStatic = require('angular');

export var moduleName:string = 'ctFooter';

export var FooterModule: ng.IModule = angular.module(moduleName, []);
