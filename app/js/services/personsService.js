/**
 * Created by Cristian on 10/04/2016.
 */

'use strict';

app.factory('personsService',
    function ($http, $resource, baseSrvcUrl) {
        var schema = {
            name: '@name',
            surname: '@surname',
            date: {
                year: '@year',
                month: '@month',
                day: '@day',
                hour: '@hour',
                minutes: '@minutes'
            },
            tz: '@tz'
            //comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
        };

        /**
         * Return a person or all persons
         * @param personId person id
         * @returns a promise
         */
        function person(personId, successCallback, failCallback) {
            var url = baseSrvcUrl + '/persons' + ((personId) ? '/' + personId : '');
            console.log('Getting person(s)', url);

            var personsResource = $resource(
                url,
                {id: '@id'},
                {
                    query: {method: 'GET', isArray: true},
                    get: {method: 'GET', isArray: false},
                    save: {method: 'POST'},
                    delete: {method: 'DELETE'}
                });

            return personsResource;
        }

        /**
         * Edit a person by id
         * @param objectId person id
         * @param data person data
         * @returns {*|{method}}
         */
        function editPerson(objectId, data) {
            var url = baseSrvcUrl + '/persons/' + objectId;
            console.log('Edit person(s)', url);
            return $resource(url, {
                person: "@person",
                number: "@number"
            }, {
                update: {
                    method: 'PUT'
                }
            }).update(data);
        }

        function addPerson(phoneData) {
            return $resource(baseSrvcUrl + '1/classes/Phone', {
                person: "@person",
                number: "@number",
                ACL: "@ACL"
            }).save(phoneData);
        }

        return {
            add: addPerson,
            person: person,
            edit: editPerson
        };
    }
);