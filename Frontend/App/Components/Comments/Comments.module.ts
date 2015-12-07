/// <reference path="../../_all.d.ts"/>

/// <amd-dependency path="angular" />

var angular: ng.IAngularStatic = require('angular');

export var moduleName:string = 'ctComments';

export var CommentsModule: ng.IModule = angular.module(moduleName, []);
