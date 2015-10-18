'use strict';

/**
 * @ngdoc function
 * @name feedReaderApp.service:googlePlusService
 * @description
 * # googlePlus
 * service to handle google+ API
 */

angular.module('feedReaderApp').factory('googleplus',
  ['$window', '$http', 'googlelogin',
    function serviceHandler($window, $http, googlelogin){
      var googlePlusService = {};
      var api_key = 'AIzaSyCAZB__dXcyioKhxSxA0zAXfu17kfXMt90';
      var gapi = $window.gapi;

      googlePlusService.isSignedIn = function(){
        var profile = googlelogin.getProfile();
        return (typeof profile == 'undefined') ? false : true;
      }

      googlePlusService.getFeeds = function(){
        if(!this.isSignedIn()) return;
        var profile = googlelogin.getProfile();
        return $http.get('https://www.googleapis.com/plus/v1/people/+busuu/activities/public', {
          headers: {'Authorization': profile.wc.token_type + ' ' +profile.wc.access_token }
        });
      };

      return googlePlusService;
    }]
);
