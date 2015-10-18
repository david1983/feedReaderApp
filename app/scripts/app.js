'use strict';

/**
 * @ngdoc overview
 * @name feedReaderApp
 * @description
 * # feedReaderApp
 *
 * Main module of the application.
 */
angular
  .module('feedReaderApp', [
    'ngAnimate',
    'ngCookies',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/feeds', {
        templateUrl: 'views/feeds.html',
        controller: 'FeedsCtrl',
        controllerAs: 'feeds'
      })
      .when('/movies', {
        templateUrl: '../views/movies.html',
        controller: 'moviesCtrl',
        controllerAs: 'movies'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
