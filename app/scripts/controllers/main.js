'use strict';

/**
 * @ngdoc function
 * @name feedReaderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the feedReaderApp
 */
angular.module('feedReaderApp')
  .controller('MainCtrl', [ 'googlelogin','$location',
    function ( googlelogin, $location) {
      console.log($location.path())
      this.profile = googlelogin.getProfile() || {};
      this.feeds = {};

      googlelogin.listen('event:google-plus-signin-success',function(){
        this.profile = googlelogin.getProfile();
      }.bind(this));

      googlelogin.listen('event:google-plus-signin-failure',function(err){
        /**
         *  Handle login emrrors here
         */
        console.warn(err);

      }.bind(this));

    }]
);


