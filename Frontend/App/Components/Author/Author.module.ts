/// <reference path="../../_all.d.ts"/>

/// <amd-dependency path="angular" />

var angular: ng.IAngularStatic = require('angular');

export var moduleName:string = 'ctAuthor';

export var AuthorModule: ng.IModule = angular.module(moduleName, []);
