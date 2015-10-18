"use strict";

angular.module('feedReaderApp')
  .factory('moviesdb', ['$http', '$q', function($http, $q){
    var key = '870520dfaf4f85e4a9279f5069b54222';
    var base_url = 'https://api.themoviedb.org/3/';

    var moviedb = {};

    moviedb.getConfiguration = function(){
      return $http.get(base_url + 'configuration' + "?api_key=" + key)
    }

    moviedb.getMovies= function(search){
        return $http.get(base_url + 'configuration' + "?api_key=" + key).then(function(configuration){
          return $http.get(base_url + 'discover/movie?sort_by=popularity.desc' + "&api_key=" + key).then(function(movies){
            var image_full_path = configuration.data.images.base_url + configuration.data.images.poster_sizes[5];
            return $q(function(resolve,reject){
                angular.forEach(movies.data.results,function(item){
                  item.image_full_path = image_full_path + item.poster_path;
                });
                resolve(movies);
            })
          })
        });
    };

    moviedb.createList = function(name, description){
      if(!this.session_id) { return $q.reject('session_id is missing'); }
      if(typeof name === 'undefined' || !name) { return $q.reject('list name is missing'); }
      if(typeof description === 'undefined' || !description) { return $q.reject('list description is missing'); }
      var body = {
        name : name,
        description: description
      };
      return $http.post(base_url + 'list?api_key=' + key + '&session_id=' + this.session_id, body);
    };

    moviedb.searchList = function(query){
      if(!this.session_id) { return $q.reject('session_id is missing'); }
      if(typeof query === 'undefined' || !query) { return $q.reject('search query is missing'); }
      return $http.get(base_url + 'search/list' + "?api_key=" + key + '&query=' + query);
    }

    moviedb.getMyLists = function(){
      if(!this.session_id) { return $q.reject('session_id is missing'); }
      if(!this.account.id) { return $q.reject('account.id is missing'); }
      return $http.get(base_url + 'account/' +this.account.id+ '/lists?api_key=' + key + '&session_id=' + this.session_id);
    }

    moviedb.removeList = function(list_id){
      if(!this.session_id) { return $q.reject('session_id is missing'); }
      if(typeof list_id === 'undefined' || !list_id) { return $q.reject('list id is missing'); }
      return $http.delete(base_url + 'list/' + list_id + '?api_key=' + key + '&session_id='+ this.session_id );
    }

    moviedb.getList = function(list_id){
      if(!this.session_id) { return $q.reject('session_id is missing'); }
      if(typeof list_id === 'undefined' || !list_id) { return $q.reject('list id is missing'); }
      return $http.get(base_url + 'list/' + list_id + '?api_key=' + key );
    }

    moviedb.addToList = function(movie_id,list_id){
      if(!this.session_id) { return $q.reject('session_id is missing'); }
      if(typeof list_id === 'undefined' || !list_id) { return $q.reject('list id is missing'); }
      if(typeof movie_id === 'undefined' || !movie_id) { return $q.reject('movie id is missing'); }
      return $http.post(base_url + 'list/' + list_id + '/add_item?api_key=' + key + '&session_id='+ this.session_id,{media_id: movie_id} );
    }

    moviedb.removeFromList = function(movie_id,list_id){
      if(!this.session_id) { return $q.reject('session_id is missing'); }
      if(typeof list_id === 'undefined' || !list_id) { return $q.reject('list id is missing'); }
      if(typeof movie_id === 'undefined' || !movie_id) { return $q.reject('movie id is missing'); }
      return $http.post(base_url + 'list/' + list_id + '/remove_item?api_key=' + key + '&session_id='+ this.session_id,{media_id: movie_id} );
    }

    moviedb.getItemStatus = function(movie_id,list_id){
      if(!this.session_id) { return $q.reject('session_id is missing'); }
      if(typeof list_id === 'undefined' || !list_id) { return $q.reject('list id is missing'); }
      if(typeof movie_id === 'undefined' || !movie_id) { return $q.reject('movie id is missing'); }
      return $http.get(base_url + 'list/' + list_id + '/item_status?api_key=' + key +
        '&session_id='+ this.session_id + '&movie_id=' + movie_id );
    }



    moviedb.login = function(username, password){
      return $http.get(base_url + 'authentication/token/new?api_key=' + key)
        .then(function(result){
          return $http.get(base_url + 'authentication/token/validate_with_login?api_key=' + key +
            '&request_token=' + result.data.request_token + '&username=' + username + '&password=' + password)
            .then(function(result){
              return $http.get(base_url + 'authentication/session/new?api_key=' + key + '&request_token='+ result.data.request_token )
                .then(function(result){
                  return $q(function(resolve,reject){
                    if(!result.data.success) reject(result);
                    moviedb.session_id = result.data.session_id;
                    resolve(result);
                  });
                });
          });
      });
    }

    moviedb.getAccount = function(){
      if(!this.session_id) { return $q.reject('session_id is missing'); }
      return $http.get(base_url + 'account?api_key=' + key + '&session_id=' + this.session_id)
        .then(function(result){
            moviedb.account = result.data;
            return $q(function(resolve,reject){
              if(!result.data) reject(result);
              resolve(result);
            });
        });
    }

    return moviedb;
  }]);
