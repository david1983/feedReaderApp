'use strict';

/**
 * @ngdoc function
 * @name feedReaderApp.service:googlePlusService
 * @description
 * # googlePlus
 * service to handle google+ API
 */

angular.module('feedReaderApp')
  .directive('googlePlusSignin', ['$window',  'googlelogin', '$location', '$cookies',
    function ($window, googlelogin, location, $cookies) {
    var ending = /\.apps\.googleusercontent\.com$/;
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      template: '<div id="btnWrapper">' +
                '<span>Sign in with: &nbsp</span>' +
                '<div id="customBtn" class="customGPlusSignIn">' +
                '<span class="icon"></span>' +
                '<span class="buttonText">Google</span>' +
                '</div>' +
                '</div>',
      link: function (scope, element, attrs, ctrl, linker) {
        scope.location = location;
        scope.$watch('location.path()', function(){
          // Some default values, based on prior versions of this directive
          function onSuccess(authResult) {
            $cookies.putObject('authData', authResult);
            googlelogin.setProfile(authResult);
            $window.location = '/';
          }
          function onFailure() {
            googlelogin.broadcast('event:google-plus-signin-failure');
          }
          attrs.clientid += (ending.test(attrs.clientid) ? '' : '.apps.googleusercontent.com');
          attrs.$set('data-clientid', attrs.clientid);
          var defaults = {
            'scope': 'https://www.googleapis.com/auth/plus.login',
            'width': 250,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': onSuccess,
            'onfailure': onFailure,
            'autorender': false,
            'customtargetid': 'customBtn',
            'cookiepolicy' : 'single_host_origin',
          };

          defaults.clientid = attrs.clientid;

          // Overwrite default values if explicitly set
          angular.forEach(Object.getOwnPropertyNames(defaults), function (propName) {
            if (attrs.hasOwnProperty(propName)) {
              defaults[propName] = attrs[propName];
            }
          });

          // Default language
          // Supported languages: https://developers.google.com/+/web/api/supported-languages
          attrs.$observe('language', function (value) {
            $window.___gcfg = {
              lang: value ? value : 'en'
            };
          });

          linker(function (el) {

            function handleGoogleAuthObj(gapi){
              var googleAuthObj = {};
              if(gapi.auth2.getAuthInstance()){
                  googleAuthObj = gapi.auth2.getAuthInstance();
               }else{
                 googleAuthObj =
                   gapi.auth2.init({
                     client_id: defaults.clientid,
                   });
               }

                googleAuthObj.attachClickHandler(defaults.customtargetid, {}, defaults.onsuccess, defaults.onfailure);
            }

            function loadDirective() {
              if (el.length) {
                element.append(el);
              }
              //Initialize Auth2 with our clientId
              if(typeof $window.gapi == 'undefined') return;

              var gapi = $window.gapi;
              if(typeof gapi.auth2 != 'undefined'){
                handleGoogleAuthObj(gapi);
              }
              gapi.load('auth2', function () {
                  handleGoogleAuthObj(gapi);
              });
            }

            loadDirective();
          });

        });
      }
    };
  }]);


