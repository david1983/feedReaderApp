"use strict";

angular.module('feedReaderApp')
  .directive('movieBox', ['moviesdb','$q', function(moviesdb,$q){
    return {
      restrict: 'E',
      scope:{
        movieData: '=',
        selectedList: '=',
        movieList: '='
      },
      template: '<ng-include src="\'views/movie-box.html\'"></ng-include>',
      controller: ['$scope','$q','$location', function($scope,$q, $location){
        $scope.add = function(list_id){
          moviesdb.addToList($scope.movieData.id, list_id)
            .then(function(result){
              $scope.getMyLists();
            })
        }

        $scope.remove = function(list_id){
          moviesdb.removeFromList($scope.movieData.id, list_id)
            .then(function(result){
              $scope.getMyLists()
            })
        }

        if(!$scope.movieData.image_full_path){
          moviesdb.getConfiguration().then(function(configuration){
            $scope.movieData.image_full_path = configuration.data.images.base_url + configuration.data.images.poster_sizes[5] + $scope.movieData.poster_path;
          });
        }

        $scope.getMyLists = function(){
          moviesdb.getMyLists().then(function(lists){
            var proms = _.map(lists.data.results,function(list){
                return moviesdb.getItemStatus($scope.movieData.id,list.id).then(function(status){
                    list.itemPresent = status.data.item_present;
                    return list;
                });
            });
            $q.all(proms).then(function(lists){
              $scope.itemPresentCounter = 0;
              angular.forEach(lists,function(list){
                if(list.itemPresent) $scope.itemPresentCounter++
              });
              $scope.myLists = lists;
            });
          });
        }

        $scope.goTo = function(active){
          $location.search({active:active});
        }

      }]
    };
  }]);
