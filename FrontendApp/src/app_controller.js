(function() {
  'use strict';

  angular
    .module('ctApp')
    .controller('AppController', [
      'seoTitleFactory',
      'seoMetaFactory',
      AppController
    ]);

  function AppController(titleService, metaService) {
    var vm = this;

    vm.metaDescription = function() {
      return metaService.getDescription();
    };

    vm.metaKeywords = function() {
      metaService.appendKeywords([{
        name: 'CTeam'
      }]);
      return metaService.getKeywords();
    };
  }
}).call();
