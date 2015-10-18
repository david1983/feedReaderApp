'use strict';

/**
 * @ngdoc function
 * @name feedReaderApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the feedReaderApp
 */
angular.module('feedReaderApp')
  .controller('FeedsCtrl', ['googleplus', '$location',
    function (googleplus, $location) {
      if(!googleplus.isSignedIn()){
        $location.path('/')
        return;
      }

      this.googleFeeds = ['dsadsa'];
      this.getFeeds = function(){
          return googleplus.getFeeds().then(function(result){
            this.googleFeeds = result.data.items;
          }.bind(this), function(err){
            console.war(result);
          }.bind(this))
      }

      this.getFeeds();
  }]);
