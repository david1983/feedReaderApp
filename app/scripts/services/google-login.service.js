'use strict';

/**
 * @ngdoc function
 * @name feedReaderApp.service:googlePlusService
 * @description
 * # googlePlus
 * service to handle google+ API
 */

angular.module('feedReaderApp').service('googlelogin',
  ['$rootScope','$cookies',
    function serviceHandler($rootScope, $cookies){


      this.broadcast = function(event,data) {
        $rootScope.$broadcast(event, data);
      };
      this.listen = function(event,callback) {$rootScope.$on(event,callback); };
      this.setProfile = function(authData){
        $rootScope.$apply(function(){
          this.profile = authData;
          this.broadcast('event:google-plus-signin-success');
        }.bind(this));
      };
      this.getProfile = function(){
        return this.profile;
      };
      this.getToken = function(){
        if(this.profile.wc){
          return this.profile.wc.access_token;
        }
      };
      this.logout = function(){
        $rootScope.$apply(function(){
          this.profile = {};
          $cookies.remove('authData');
          this.broadcast('event:google-plus-signout-success');
        }.bind(this));
      };

      var authCookie = $cookies.get('authData');
      if(typeof  authCookie != 'undefined'){
        this.profile=JSON.parse(authCookie)
      }


    }]
);
