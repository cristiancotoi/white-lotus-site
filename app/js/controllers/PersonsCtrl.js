/**
 * Created by Cristian on 10/04/2016.
 */

'use strict';

app.controller(
    'personsCtrl',
    function ($scope, $rootScope, personsService) {
        $rootScope.pageTitle = 'List';
        $scope.results = [];

        var person = {
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

        var promiseSave = personsService
            .person({
                name: 'George',
                surname: 'of the Jungle'
            })
            .save();

        var savePromiseResult = promiseSave
            .$promise
            .catch(function (err) {
                console.log('Persons err', err);
            })
            .then(function (payload) {
                console.log('Persons payload', payload.data);
                console.log('Persons data', payload.data);
                console.log(promiseQuery);
            });
        console.log(savePromiseResult);

        var promiseQuery = personsService
            .person()
            .query();

        var promiseResult = promiseQuery
            .$promise
            .catch(function (err) {
                console.log('Persons err', err);
            })
            .then(function (payload) {
                console.log('Persons payload', payload.data);
                console.log('Persons data', payload.data);
                console.log(promiseQuery);
            });
        console.log(promiseResult);
    }
);