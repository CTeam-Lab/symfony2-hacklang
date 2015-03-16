angular.module 'CTeamLab', ['ngRoute', 'Seo', 'Post', 'FollowUs', 'Header', 'Footer', 'Author', 'Comments']

.config ['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) ->
  $locationProvider.html5Mode(true).hashPrefix('!')

  $routeProvider
    .otherwise
      redirectTo: '/'
]

.controller 'AppCtrl', ['TitleService', 'MetaService', '$scope', (titleService, metaService, $scope) ->
  $scope.metaDescription = ->
    metaService.getDescription()

  $scope.metaKeywords = ->
    metaService.getKeywords()
]
