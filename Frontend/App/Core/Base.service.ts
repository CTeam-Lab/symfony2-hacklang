/// <reference path="../_all.d.ts"/>

import {IBaseService} from 'ct';

class BaseService implements IBaseService {
  static $inject: string[] = [];
  static Name: string = 'service';

  constructor() {}
}

export default BaseService;
