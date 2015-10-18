'use strict';

describe('Controller: FeedsCtrl', function () {

  // load the controller's module
  beforeEach(module('feedReaderApp'));

  var FeedsCtrl,
    scope;



  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    var mockedFeedService = {
      getFeeds : function(){
        return $q(function(resolve,reject){
          resolve({
            data: {
              items: ['dsa', 'dsa', 'dsadas']
            }
          });
        });
      }
    }
    scope = $rootScope.$new();
    FeedsCtrl = $controller('FeedsCtrl', {
      $scope: this,
      'googleplus': mockedFeedService
      // place here mocked dependencies
    });
  }));

  it('should load feeds to googleFeeds property', function () {
      FeedsCtrl.getFeeds().then(function(result){
        expect(result.data.items.length).toBe(3);
      })
  });
});
