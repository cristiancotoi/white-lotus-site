'use strict';

angular
    .module('whiteLotusApp.baZi', [])
    .controller('PersonBaZiReportController', function ($scope, $stateParams, $q, Person, BaZi) {
        $scope.person = Person.get({id: $stateParams.id});
        BaZi.get({id: $stateParams.id})
            .$promise
            .then(function (report) {
                $scope.age = report.age;

                $scope.c = report.detailedChart;
                $scope.l = report.chart.luck;
                $scope.currentLuck = report.currentLuckPillar;
                $scope.lStart = report.chart.startYear;
                $scope.a = report.chart.astro;
                $scope.ph = report.phases;
                $scope.st = report.heavenlyStems;
                $scope.br = report.earthlyBranches;

                $scope.dm = report.dm;
                $scope.stScores = report.godsScore;

                $scope.t = {
                    hour: Math.floor($scope.a.hour),
                    minute: $scope.a.minute
                };

                $scope.brRelArray = report.branchRelations;

                $scope.pillarRoNames = {
                    year: 'An',
                    month: 'Lună',
                    day: 'Zi',
                    hour: 'Oră',
                    luck: 'Noroc'
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

                $scope.ss = report.shenSha;
                $scope.ssDesc = report.shenShaDesc;
            });
    });
