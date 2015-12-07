/// <reference path="../_all.d.ts"/>

import {IBaseDirective} from 'ct';

class BaseDirective implements IBaseDirective {
  static $inject: string[] = [];
  static $name: string = '';

  constructor() {}
}

export default BaseDirective;
