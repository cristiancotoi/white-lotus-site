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

/*        function get() {
            var deferredObject = $q.defer();

            $resource(apiUrl, {id: '@_id'})
                .get()
                .$promise
                .then(function (result) {
                    deferredObject.resolve(result);
                }, function (errorMsg) {
                    deferredObject.reject(errorMsg);
                });
            return deferredObject.promise;
        }

        return {
            get: get
        };*/
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
