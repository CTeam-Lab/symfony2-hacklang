angular.module 'Seo'

.service 'TitleService', ->
  @.title = ''

  getTitle: ->
    @.title
  setTitle: (title) ->
    @.title = title
