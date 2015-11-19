/// <reference path="../_all.d.ts"/>

/// <amd-dependency path="angular" />

import {moduleName as PostModuleName} from './Post/Post.module';
import {moduleName as CommentsModuleName} from './Comments/Comments.module';
import {moduleName as AuthorModuleName} from './Author/Author.module';

var angular: ng.IAngularStatic = require('angular');

export var moduleName:string = 'ctComponents';

export var ComponentsModule: ng.IModule = angular.module(moduleName, [
  PostModuleName,
  CommentsModuleName,
  AuthorModuleName
]);
