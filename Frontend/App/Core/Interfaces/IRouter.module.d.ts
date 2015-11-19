/// <reference path="../../_all.d.ts"/>

declare namespace ct {
  interface IRouterModule extends IBaseModule {
    config(configuration: IRouterConfiguration): IRouterModule;
  }
}
