/// <reference path="../_all.d.ts"/>

import {
  IBaseService,
  IBaseProvider
} from 'ct';

import {
  auto as ngAuto
} from 'angular';

import BaseService from './Base.service';

class BaseProvider implements IBaseProvider {
  static Name: string = 'base';
  private serviceClass: Function;
  private locals: Object;

  constructor() {}

  protected overrideServiceClass(serviceClass: Function) {
    this.serviceClass = serviceClass;
  }

  protected overrideLocals(locals: Object) {
    this.locals = locals;
  }

  // NOTE configuration functions look like this:
  // setConfiguration(arg: any) {
  //   // Do something...
  // }

  $get = ['$injector', ($injector: ngAuto.IInjectorService) => {
    if (this.serviceClass) {
      this.locals = this.locals || {};
      return $injector.instantiate(this.serviceClass, this.locals);
    } else {
      return {}
    }
  }]
}

export default BaseProvider;
