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
                    $scope.orderOptions = [
                        {label: 'Nume', value: 'name'},
                        {label: 'Nume desc', value: '-name'},
                        {label: 'Prenume', value: 'surname'},
                        {label: 'Prenume desc', value: '-surname'},
                        {label: 'An', value: 'date.year'},
                        {label: 'An desc', value: '-date.year'},
                        {label: 'TZ', value: 'tz'}
                    ];
                    $scope.personsOrderBy = $scope.orderOptions[0].value;
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
        PSquare
            .get({id: $stateParams.id})
            .$promise
            .then(function (report) {
                var square = report.square;

                $scope.s = square;
                $scope.op = report.op;

                $scope.sl = report.spiritLevel;
                $scope.d = report.destiny;
                $scope.iv = report['interior vibration'];
                $scope.ev = report['exterior vibration'];
                $scope.cv = report['cosmic vibration'];

                $scope.sqm = [];
                for (var i = 1; i < report.sqMeaning.length; i++) {
                    $scope.sqm[i - 1] = {meaning: report.sqMeaning[i]};
                    if (square[i].length) {
                        $scope.sqm[i - 1].title = 'lui ' + square[i];
                    } else {
                        $scope.sqm[i - 1].title = 'lipsei cifrei ' + i;
                    }
                }
                $scope.comb = report['sq combos'];

                $scope.ordLines = [
                    '123', '456', '789',
                    '147', '258', '369',
                    '159', '357'
                ];
                $scope.l = report.lines;
                $scope.lw = report.linesWeight;

                $scope.priorities = report.priorities;
                console.log(report.lifeCycle);
                console.log(report.lifeCycleDesc);
                $scope.lc = report.lifeCycle;
                $scope.lcd = report.lifeCycleDesc;

                console.log(report);
                console.log($scope.priorities);
            });
    })
    .controller('PersonBaZiReportController', function ($scope, $stateParams, $q, Person, BaZi) {
        $scope.person = Person.get({id: $stateParams.id});
        BaZi.get({id: $stateParams.id})
            .$promise
            .then(function (report) {
                $scope.age = report.age;

                $scope.c = report.detailedChart;
                $scope.l = report.chart.luck;
                $scope.lStart = report.chart.startYear;
                $scope.a = report.chart.astro;
                $scope.ph = report.phases;
                $scope.st = report.heavenlyStems;
                $scope.br = report.earthlyBranches;

                //console.log($scope.c);
                //console.log($scope.st);
                console.log($scope.br);

                $scope.dm = report.dm;
                $scope.stScores = report.godsScore;

                $scope.t = {
                    hour: Math.floor($scope.a.hour),
                    minute: $scope.a.minute
                };

                $scope.ordStems = [
                    '甲 L+', '乙 L-',
                    '丙 F+', '丁 F-',
                    '戊 P+', '己 P-',
                    '庚 M+', '辛 M-',
                    '壬 A+', '癸 A-'
                ];

                $scope.ordBranches = [
                    '子 zǐ', '丑 chǒu',
                    '寅 yín', '卯 mǎo', '辰 chén',
                    '巳 sì', '午 wǔ', '未 wèi',
                    '申 shēn', '酉 yǒu', '戌 xū',
                    '亥 hài'
                ];

                for (var pillar = 0; pillar < Object.keys($scope.c); pillar++) {
                    $scope.c(pillar).hidStems = report.chart.chart.hidStems;
                }
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
