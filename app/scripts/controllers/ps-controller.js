'use strict';

angular
    .module('whiteLotusApp.pythagoreanSquare', [])
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
                $scope.lc = report.lifeCycle;
                $scope.lcd = report.lifeCycleDesc;

                $scope.chalArr = report.challenges;
                $scope.chalDesc = report.challengesDesc;
                $scope.opportArr = report.opportunities;
                $scope.opportDesc = report.opportunitiesDesc;
                $scope.chAndOpIntervals = report.chAndOpIntervals;

                $scope.luckChart = report.luckChartDigits.digits;
                $scope.luckChartNumber = report.luckChartDigits.number;
                $scope.luckChartDesc = report.luckChartDigits.descriptions;
                $scope.luckYears = report.luckYears;
            });
    })
    .directive('linearChart', function ($window) {
        return {
            restrict: 'EA',
            template: '<svg height="200"></svg>',
            link: function (scope, elem, attrs) {
                var dataToPlot = scope[attrs.chartData];
                var padding = 20;
                var pathClass = 'path';
                var xScale, yScale, xAxisGen, yAxisGen, lineFun;

                var d3 = $window.d3;
                var rawSvg = elem.find('svg')[0];
                var svg = d3.select(rawSvg);
                svg.attr('width', elem.width());
                //svg.attr('height', elem.width() * 2 / 3);
                console.log(svg[0]);
                var width = svg.attr('width'),
                    height = svg.attr('height');

                function setChartParameters() {
                    xScale = d3.scale.linear()
                        .domain([dataToPlot[0].position, dataToPlot[dataToPlot.length - 1].position])
                        .range([padding + 5, width - padding]);

                    yScale = d3.scale.linear()
                        .domain([0, d3.max(dataToPlot,
                            function (d) {
                                return d.value;
                            }) + 1
                        ])
                        .range([height - padding, 0]);

                    xAxisGen = d3.svg.axis()
                        .scale(xScale)
                        .orient('bottom')
                        .ticks(dataToPlot.length - 1);

                    yAxisGen = d3.svg.axis()
                        .scale(yScale)
                        .orient('left')
                        .ticks(d3.max(dataToPlot,
                                function (d) {
                                    return d.value;
                                }
                            ) + 1);

                    lineFun = d3.svg.line()
                        .x(function (d) {
                            return xScale(d.position);
                        })
                        .y(function (d) {
                            return yScale(d.value);
                        })
                        .interpolate('linear');
                }

                function drawLineChart() {

                    setChartParameters();

                    svg.append('svg:g')
                        .attr('class', 'x axis')
                        .attr('transform', 'translate(0,' + (height - padding) + ')')
                        .call(xAxisGen);

                    svg.append('svg:g')
                        .attr('class', 'y axis')
                        .attr('transform', 'translate(' + padding + ',0)')
                        .call(yAxisGen);

                    svg.append('svg:path')
                        .attr({
                            d: lineFun(dataToPlot),
                            'stroke': 'blue',
                            'stroke-width': 2,
                            'fill': 'none',
                            'class': pathClass
                        });
                }

                drawLineChart();
            }
        };
    });
