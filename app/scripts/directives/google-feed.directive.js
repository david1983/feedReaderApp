"use strict";


angular.module('feedReaderApp')
  .directive('googlePlusFeed', function(){
    return {
      restrict: 'E',
      scope:{
        googleFeed: '='
      },
      template: '<h4>{{googleFeed.title}}</h4>' +
                '<div>' +
                    '<img ng-src="{{googleFeed.object.attachments[0].fullImage.url}}" style="width:100%">' +
                    '<p ng-bind-html="googleFeed.object.content | htmlfilter"></p>' +
                '</div>'
    };
  });
