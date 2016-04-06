'use strict';

app.factory('phoneSrvc',
    function ($http, $resource, baseSrvcUrl, authSrvc) {
        authSrvc.setAuthHeaders();
        return {
            add: function (phoneData) {
                return $resource(baseSrvcUrl + '1/classes/Phone', {
                    person: "@person",
                    number: "@number",
                    ACL: "@ACL"
                }).save(phoneData);
            },
            get: function (objectId) {
                return $resource(baseSrvcUrl + '1/classes/Phone' + ((objectId) ? '/' + objectId : '')).get();
            },
            edit: function (objectId, phoneData) {
                return $resource(baseSrvcUrl + '1/classes/Phone/' + objectId, {
                    person: "@person",
                    number: "@number"
                }, {
                    update: {
                        method: 'PUT'
                    }
                }).update(phoneData);
            },
            delete: function (objectId) {
                return $resource(baseSrvcUrl + '1/classes/Phone/' + objectId, {
                    person: "@person",
                    number: "@number"
                }).delete();
            }
        }
    }
);