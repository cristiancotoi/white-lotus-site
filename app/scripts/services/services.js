'use strict';

angular
    .module('personApp.services', ['config'])
    .factory('Person', function ($resource, ENV) {
        var apiUrl = ENV.apiEndpoint + '/api/persons/:id';
        return $resource(apiUrl, {id: '@_id'}, {
            update: {
                method: 'PUT'
            },
            deletePerson: {
                method: 'DELETE'
            }
        });
    })
    .factory('Portfolio', function ($http, ENV) {
        var apiUrl = ENV.apiEndpoint + '/api/portfolio';
        var request = {
            method: 'POST',
            url: apiUrl,
            data: {analystId: 'test'}
        };
        return $http(request);
    })
    .factory('PSquare', function ($resource, $q, ENV) {
        var apiUrl = ENV.apiEndpoint + '/api/psquare/:id';
        return $resource(apiUrl, {id: '@_id'});
    })
    .factory('BaZi', function ($resource, ENV) {
        var apiUrl = ENV.apiEndpoint + '/api/bazi/:id';
        return $resource(apiUrl, {id: '@_id'});
    })
    .service('popupService', function ($window) {
        this.showPopup = function (message) {
            return $window.confirm(message);
        };
    });
