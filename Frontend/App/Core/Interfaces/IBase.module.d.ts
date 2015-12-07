/// <reference path="../../_all.d.ts"/>

declare namespace ct {
  interface IBaseModule {
    name(): string;
    config(configuration: IBaseConfiguration): IBaseModule;
    run(configuration: IBaseConfiguration): IBaseModule;
    directive(directive: any): IBaseModule;
    provider(provider: any): IBaseModule;
    service(service: IBaseService): IBaseModule;
  }
}
