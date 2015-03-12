angular.module 'Seo'

.service 'MetaService', ->
  @.description = ''
  @.keywords = ''

  getDescription: ->
    @.description
  getKeywords: ->
    @.keywords
  setDescription: (description) ->
    @.description = description
  setKeywords: (keywords) ->
    @.keywords = keywords
  appendKeywords: (keywords) ->
    _.each keywords, (val) ->
      if @.keywords == ''
        @.keywords += val.name
      else
        @.keywords += ", #{val.name}"
