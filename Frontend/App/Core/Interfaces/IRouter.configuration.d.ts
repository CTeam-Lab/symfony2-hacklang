/// <reference path="../../_all.d.ts"/>

declare namespace ct {
  interface IRouterConfiguration extends IBaseConfiguration {
    state(name: string, configs: ng.ui.IState): IRouterConfiguration;
  }
}
