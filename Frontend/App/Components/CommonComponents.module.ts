/// <reference path="../_all.d.ts"/>

/// <amd-dependency path="angular" />

import HeaderModuleName from './Header/Header.module';
import FooterModuleName from './Footer/Footer.module';

var moduleName: string = 'ctCommmonComponents';

angular.module(moduleName, [
  HeaderModuleName,
  FooterModuleName,
]);

export default moduleName;
