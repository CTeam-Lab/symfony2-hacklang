/// <reference path="../_all.d.ts"/>

import {IRouterConfiguration} from 'ct';
import BaseConfiguration from './Base.Configuration';

export default class RouterConfiguration extends BaseConfiguration implements IRouterConfiguration {
  static $inject: string[] = [
    '$stateProvider'
  ];

  constructor(
    protected $stateProvider: ng.ui.IStateProvider
  ) {
    super();
  }

  state(name: string, configs: ng.ui.IState): IRouterConfiguration {
    this.$stateProvider.state(
      name,
      configs
    );

    return this;
  }
}
