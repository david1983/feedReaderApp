"use strict";

angular.module('feedReaderApp')
  .directive('googlePlusFeeds', ['$window',
  function($window){
    return {
      restrict: 'E',
      scope:{
        googleFeeds: "=",
        webApi: '=',
        apiKey: '@'
      },
      template: '<div ng-repeat="feed in googleFeeds" class="feed-box">' +
                  '<google-plus-feed google-feed="feed"></google-plus-feed>' +
                '</div>',
      controller: ['$scope','$q', function ($scope, $q) {

        function getFeed(){
          return gapi.client.load('plus', 'v1').then(function() {
            var request = gapi.client.plus.activities.list({
              'userId' : '+busuu',
              'collection' : 'public'
            });

            return $q(function(resolve, reject){
              request.execute(function(results){
                resolve(results);
              }, function(err){
                reject(err);
              });
            });
          });
        }

        if($scope.webApi){
          var API_KEY = $scope.apiKey;
          var gapi = $window.gapi;
          gapi.client.setApiKey(API_KEY);
          getFeed().then(function(result){
            $scope.$apply(function(){
              $scope.googleFeeds=result.items;
            });
          }.bind($scope));
        }

      }]
    };
  }]);

