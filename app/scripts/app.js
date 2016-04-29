'use strict';

/**
 * @ngdoc overview
 * @name whiteLotusSiteDemoApp
 * @description
 * # whiteLotusSiteDemoApp
 *
 * Main module of the application.
 */
angular
  .module('whiteLotusSiteDemoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'personApp.controllers',
    'personApp.services'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('persons', {
        url: '/persons',
        templateUrl: 'views/persons.html',
        controller: 'PersonListController'
      })
      .state('viewPerson', {
        url: '/persons/:id/view',
        templateUrl: 'views/person-view.html',
        controller: 'PersonViewController'
      })
      .state('newPerson', {
        url: '/persons/new',
        templateUrl: 'views/person-add.html',
        controller: 'PersonCreateController'
      })
      .state('editPerson', {
        url: '/persons/:id/edit',
        templateUrl: 'views/person-edit.html',
        controller: 'PersonEditController'
      });
  })
  .run(function ($state) {
      $state.go('home');
    }
  );
