'use strict';

describe('Service: AboutCtrl', function () {
  var mockWindow, mockModalSvc, sampleSvcObj;
  beforeEach(function(){
    module(function($provide){
      $provide.service('$window', function(){
        this.alert= jasmine.createSpy('alert');
      });
      $provide.service('modalSvc', function(){
        this.showModalDialog = jasmine.createSpy('showModalDialog');
      });
    });
    module('services');
  });

  beforeEach(inject(function($window, modalSvc, sampleSvc){
    mockWindow=$window;
    mockModalSvc=modalSvc;
    sampleSvcObj=sampleSvc;
  }));
});
