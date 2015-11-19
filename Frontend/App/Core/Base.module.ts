/// <reference path="../_all.d.ts"/>

/// <amd-dependency path="angular" />

import {
  IBaseModule,
  IBaseConfiguration,
  IBaseRun,
  IBaseDirective,
  IBaseService,
  IBaseProvider
} from 'ct';

import {
  IModule as ngIModule,
  IDirectiveFactory as ngIDirectiveFactory,
  IServiceProviderFactory as ngIServiceProviderFactory
} from 'angular';

export default class BaseModule implements IBaseModule {
  private native: ngIModule;

  constructor(name: string, dependencies?: string[], configuration?: IBaseConfiguration) {
    this.native = angular.module(name, (dependencies ? dependencies : []), <Function>configuration);
  }

  name(): string {
    return this.native.name;
  }

  config(configuration: IBaseConfiguration): IBaseModule {
    this.native.config(<Function>configuration);
    return this;
  }

  run(run: IBaseRun): IBaseModule {
    this.native.run(<Function>run);
    return this;
  }

  directive(directive: any): IBaseModule {
    var factory: ngIDirectiveFactory = (...params: any[]): IBaseDirective => {
      return new directive(params);
    }

    factory.$inject = directive.$inject;
    this.native.directive(directive.Name, factory);

    return this;
  }

  provider(provider: any): IBaseModule {
    this.native.provider(provider.Name, provider);

    return this;
  }

  service(service: IBaseService): IBaseModule {
    this.native.service(service.Name, <Function>service);

    return this;
  }
}
