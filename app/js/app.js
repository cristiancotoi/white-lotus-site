'use strict';

var app = angular.module('app', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap.pagination'
]);

app
    .constant('baseSrvcUrl', 'http://localhost:3000');

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
        })
        .when('/persons', {
            templateUrl: 'templates/persons.html',
            controller: 'personsCtrl'
        })
        .when('/addPerson', {
            templateUrl: 'templates/create-update-delete-person.html',
            controller: 'CreateUpdateDeletePersonCtrl'
        })
        .otherwise(
            {redirectTo: '/'}
        )
    ;
});

app.run(function ($rootScope, $location) {
    $rootScope.$on('$locationChangeStart', function (event) {
        /*if (((($location.path().indexOf("/add") != -1) || ($location.path().indexOf("/persons") != -1)
                || ($location.path().indexOf("/edit") != -1) || ($location.path().indexOf("/delete") != -1)
            ) && !authSrvc.isLoggedIn()) ||
            (($location.path().indexOf("/login") != -1) && authSrvc.isLoggedIn())) {
            // Authorization check: anonymous site visitors cannot access user routes
            $location.path("/");
        }*/
    });
});