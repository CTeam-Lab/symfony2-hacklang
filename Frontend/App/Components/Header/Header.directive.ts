/// <reference path="../../_all.d.ts"/>

export default class HeaderDirective {
  static Name: string = 'ctHeader';

  static GetDirective(): ng.IDirective {
    return {
      restrict: 'E',
      templateUrl: 'Components/Header/Header.tpl.jade'
    };
  }
}
