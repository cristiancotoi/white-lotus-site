/**
 * .
 */

angular
    .module('personApp.services', [])
    .factory('Person', function ($resource) {
        return $resource('http://cristian-pc:8000/api/persons/:id', {id: '@_id'}, {
            update: {
                method: 'PUT'
            }
        });
    })
    .factory('PSquare', function ($resource) {
        return $resource('http://cristian-pc:8000/api/psquare/:id', {id: '@_id'}, {
            update: {
                method: 'PUT'
            }
        });
    })
    .service('popupService', function ($window) {
        this.showPopup = function (message) {
            return $window.confirm(message);
        }
    });