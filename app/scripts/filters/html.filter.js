"use strict";

angular.module('feedReaderApp')
.filter('htmlfilter', ['$sce',function($sce) {
    return function(value, type) {
      return $sce.trustAs(type || 'html', value);
    };
  }]);
