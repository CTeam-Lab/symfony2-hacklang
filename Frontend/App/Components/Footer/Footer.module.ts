/// <reference path="../../_all.d.ts"/>

/// <amd-dependency path="angular" />

import FooterDirective from './Footer.directive';

var moduleName: string = 'ctFooter';

angular
  .module(moduleName, [])
  .directive(FooterDirective.Name, FooterDirective.GetDirective);

export default moduleName;
