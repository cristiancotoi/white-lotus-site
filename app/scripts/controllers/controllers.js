'use strict';

angular
    .module('personApp.controllers', [])
    .controller('PersonListController', function ($scope, $rootScope, $state, popupService, $window, Person, $http, ENV) {
        // Only get persons when the user is logged in
        $scope.$watch(function () {
            return $rootScope.userEmail;
        }, function () {
            if ($rootScope.userEmail === undefined) {
                // bail out on the first watch run - we don't need it
                return;
            }
            var request = {
                method: 'POST',
                url: ENV.apiEndpoint + '/api/portfolio',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                // this properly formats the data so express can read the json
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                    return str.join('&');
                },
                data: {analystId: $rootScope.userEmail}
            };
            $http(request).then(
                function successCallback(response) {
                    $scope.persons = response.data;
                }, function errorCallback(response) {
                    console.log(response);
                });
        });

        $scope.deletePerson = function (person) {
            if (popupService.showPopup('Really delete this?')) {
                var id = person._id;
                Person.deletePerson({id: person._id});
                // Since for some reason we can't call person.$deletePerson
                // we manually remove it from UI
                for (var index = $scope.persons.length - 1; index >= 0; index--) {
                    if ($scope.persons[index]._id === id) {
                        $scope.persons.splice(index, 1);
                        break;
                    }
                }
                $state.go('persons');
            }
        };

    })
    .controller('PersonViewController', function ($scope, $stateParams, Person) {
        $scope.person = Person.get({id: $stateParams.id});
    })
    .controller('PersonPSquareReportController', function ($scope, $stateParams, Person, PSquare) {
        $scope.person = Person.get({id: $stateParams.id});
        $scope.report = PSquare
            .get({id: $stateParams.id});
        /*console.log($scope.person);
         console.log($scope.report);*/
    })
    .controller('PersonBaZiReportController', function ($scope, $stateParams, $q, Person, BaZi) {
        $scope.person = Person.get({id: $stateParams.id});
        BaZi.get({id: $stateParams.id})
            .$promise
            .then(function(report){
                $scope.c = report.detailedChart;
                $scope.l = report.chart.luck;
                $scope.a = report.chart.astro;
                $scope.ph = report.phases;
                $scope.st = report.heavenlyStems;
                $scope.br = report.earthlyBranches;

                $scope.t = {
                    hour: Math.floor($scope.a.hour),
                    minute: $scope.a.minute
                };

                for(var pillar = 0; pillar < Object.keys($scope.c); pillar++) {
                    $scope.c(pillar).hidStems = report.chart.chart.hidStems;
                }

                console.log($scope.c);
                console.log($scope.a);
            });
    })
    .controller('PersonCreateController', function ($scope, $rootScope, $state, $stateParams, Person) {

        $scope.person = new Person();

        $scope.addPerson = function () {
            $scope.person.analystId = $rootScope.userEmail;
            $scope.person.$save(function () {
                $state.go('persons');
            }, function (err) {
                console.log(err);
            });
        };

    })
    .controller('PersonEditController', function ($scope, $state, $stateParams, Person) {

        $scope.updatePerson = function () {
            $scope.person.$update(function () {
                $state.go('persons');
            });
        };

        $scope.loadPerson = function () {
            $scope.person = Person.get({id: $stateParams.id});
        };

        $scope.loadPerson();
    });
