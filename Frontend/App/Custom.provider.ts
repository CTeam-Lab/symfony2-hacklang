/// <reference path="./_all.d.ts"/>

import BaseService from './Core/Base.service';
import BaseProvider from './Core/Base.provider';

class CustomService extends BaseService {
  static $inject: string[] = [
    'state',
    '$rootScope'
  ];

  constructor(protected state, protected $rootScope) {
    super();
  }
}

class CustomProvider extends BaseProvider {
  static $inject: string[] = [];
  static Name: string = 'custom';

  protected state: boolean = false;

  constructor() {
    super();
    super.overrideServiceClass(CustomService);
    super.overrideLocals({state: this.state});
  }
}

export default CustomProvider;
