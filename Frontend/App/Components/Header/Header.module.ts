/// <reference path="../../_all.d.ts"/>

/// <amd-dependency path="angular" />

import HeaderDirective from './Header.directive';

var moduleName: string = 'ctHeader';

angular
  .module(moduleName, [])
  .directive(HeaderDirective.Name, HeaderDirective.GetDirective);

export default moduleName;
