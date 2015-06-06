(function() {
  'use strict';

  angular
    .module('ctSeo')
    .factory('seoMetaFactory', seoMetaFactory)
    .factory('seoTitleFactory', seoTitleFactory);

  function seoMetaFactory() {
    var _description = '';
    var _keywords = '';

    return {
      getDescription: function() { return _description; },
      getKeywords: function() { return _keywords; },
      setDescription: function(description) { _description = description; },
      setKeywords: function(keywords) { _keywords = keywords; },
      appendKeywords: appendKeywords
    };

    function appendKeywords(keywords) {
      _.each(keywords, function(val) {
        console.log(val);
        if (_keywords === '') {
          _keywords += val.name;
        } else {
          _keywords += _keywords + ', ' + val.name;
        }
      });
    }
  }

  function seoTitleFactory() {
    var _title = '';

    return {
      getTitle: function() { return _title; },
      setTitle: function(title) { _title = title; }
    };
  }
}).call();
