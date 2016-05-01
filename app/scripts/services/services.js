'use strict';

angular
  .module('personApp.services', ['config'])
  .factory('Person', function ($resource, ENV) {
    var apiUrl = ENV.apiEndpoint + '/api/persons/:id';
    return $resource(apiUrl, {id: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });
  })
  .factory('PSquare', function ($resource, ENV) {
    var apiUrl = ENV.apiEndpoint + '/api/psquare/:id';
    return $resource(apiUrl, {id: '@_id'}/*, {
      update: {
        method: 'PUT'
      }
    }*/);
  })
  .factory('PSquareOp', function ($resource, ENV) {
    var apiUrl = ENV.apiEndpoint + '/api/psquare-data/op';
    return $resource(apiUrl);
  })
  .service('popupService', function ($window) {
    this.showPopup = function (message) {
      return $window.confirm(message);
    };
  });
