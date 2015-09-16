/// <reference path="../_all.d.ts"/>

/// <amd-dependency path="angular" />

import {moduleName as HeaderModuleName} from './Header/Header.module';
import {moduleName as FooterModuleName} from './Footer/Footer.module';
import {moduleName as PostModuleName} from './Post/Post.module';
import {moduleName as CommentsModuleName} from './Comments/Comments.module';
import {moduleName as AuthorModuleName} from './Author/Author.module';

var angular: ng.IAngularStatic = require('angular');

export var moduleName:string = 'ctComponents';

export var ComponentsModule: ng.IModule = angular.module(moduleName, [
  HeaderModuleName,
  FooterModuleName,
  PostModuleName,
  CommentsModuleName,
  AuthorModuleName
]);
