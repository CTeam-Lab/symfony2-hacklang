/// <reference path="../../_all.d.ts"/>

export default class FotterDirective {
  static Name: string = 'ctFooter';

  static GetDirective(): ng.IDirective {
    return {
      restrict: 'E',
      templateUrl: 'Components/Footer/Footer.tpl.jade'
    };
  }
}
