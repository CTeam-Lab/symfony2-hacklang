/// <reference path="../_all.d.ts"/>

/// <amd-dependency path="angular" />

import {
  IRouterConfiguration,
  IRouterModule
} from 'ct';
import BaseModule from './Base.module';

export default class RouterModule extends BaseModule implements IRouterModule {
  constructor(name: string, dependencies?: string[], configuration?: IRouterConfiguration) {
    super(name, dependencies, configuration);
  }
}
