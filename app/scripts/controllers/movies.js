'use strict';

/**
 * @ngdoc function
 * @name feedReaderApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the feedReaderApp
 */
angular.module('feedReaderApp')
  .controller('moviesCtrl', ['moviesdb','$location', function (moviesdb,$location) {

    console.log($location.path())

    moviesdb.login('andreazzini.davide', 'davide').then(function(result){
      moviesdb.getAccount().then(function(){
        this.searchList('test');
        this.getMyLists();

      }.bind(this));
    }.bind(this),function(err){
      console.warn(err)
    }.bind(this));


    this.searchList = function(query){
      moviesdb.searchList(query).then(function(result){
        this.lists = result.data.results;
      }.bind(this),function(err){
        console.warn(err);
      }.bind(this));
    }

    this.getMyLists = function(){
      moviesdb.getMyLists().then(function(result){
        this.mylists = result.data.results;
      }.bind(this),function(err){
        console.warn(err);
      }.bind(this));
    }

    this.getList = function(list_id){
      moviesdb.getList(list_id).then(function(result){
        this.active=3;
        this.selectedList = result.data;
      }.bind(this))
    }

    this.removeList= function(list_id){
      moviesdb.removeList(list_id).then(function(result){
        this.getMyLists();
      }.bind(this))
    }


    this.createList = function(name,description){
      moviesdb.createList(name,description).then(function(result){
        this.getMyLists();
      }.bind(this),function(err){
        console.warn(err);
      }.bind(this));
    }

    this.getMovies = function(){
      moviesdb.getMovies().then(
        function(result){
          this.feeds = result.data;
          this.pagination = {
            page : result.data.page,
            total_pages: result.data.total_pages
          }
        }.bind(this),
        function(err){
          console.warn(err)
        }.bind(this)
      )
    }

    this.setPage = function(id){
      if(id==0){
        this.getMovies();
      }
      this.active=id;
    }


    if($location.search().active){
      this.active = $location.search().active;
    }else{
      this.getMovies();
      this.active = 0;
    }

  }]);
