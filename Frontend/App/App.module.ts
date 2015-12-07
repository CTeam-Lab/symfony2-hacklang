/// <reference path="./_all.d.ts" />

/// <amd-dependency path="angular" />
/// <amd-dependency path="angular-ui-router" />
/// <amd-dependency path="./Templates/Templates" />

import {
  IApplication
} from 'ct';
import RouterModule from './Core/Router.module';
import CommonComponentsName from './Components/CommonComponents.module';
import AppRun from './App.run';
import AppConfiguration from './App.configuration';
import CustomProvider from './Custom.provider';

class Application extends RouterModule implements IApplication {
  static Dependencies: string[] = [
    'ui.router',
    'ctTemplates',
    CommonComponentsName
  ];

  constructor(name: string, baseUrl: string) {
    super(name, Application.Dependencies);
    super.config(AppConfiguration);
    super.run(AppRun);
    super.provider(CustomProvider);
  }

  bootstrap(): void {
    angular.bootstrap(document, [this.name()]);
  }
}

export = Application;
