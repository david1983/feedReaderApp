"use strict";

angular.module('feedReaderApp')
.directive('googlePlusSignout',
  ['$window', 'googlelogin', function($window, googlelogin){
      return {
        restrict: 'E',
        template: 'You are logged in as {{profile.Ld.ye}} ( {{profile.Ld.Ld}} ) &nbsp | &nbsp<a href="#/" ng-click="logout()" >Sign out</a>',
        controller: ['$scope','$window', function ($scope, $window) {
            $scope.profile=googlelogin.getProfile();
            $scope.logout = function(){
                var gapi = $window.gapi;
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                  googlelogin.logout();
                  $window.location = '/';
                  console.log('User signed out.');
                });
            }

        }]
      };
  }]
);
