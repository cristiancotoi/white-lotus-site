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
                $scope.nlt = report.normalLifeType;
                $scope.stScores = report.godsScore;
                $scope.sb = report.starBinomial;

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
                    '乙 L-', '甲 L+',
                    '丁 F-', '丙 F+',
                    '己 P-', '戊 P+',
                    '辛 M-', '庚 M+',
                    '癸 A-', '壬 A+'
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
    })
    .directive('godsStrengthPieChart', function ($window) {
        return {
            restrict: 'EA',
            template: '<svg class="gods-strength-pie-chart"></svg>',
            link: function (scope, elem, attrs) {
                var d3 = $window.d3;
                var _ = $window._;

                var stemScores = scope[attrs.chartData];
                var ordStems = scope[attrs.orderedStems];
                var dm = scope[attrs.dayMaster].id;
                var dmColor = attrs.dmColor;

                var tmp = [];
                // put the key into each object for easier id
                _.each(ordStems, function (key) {
                    stemScores[key].phase = key;
                    stemScores[key].hs = key;
                    tmp.push(stemScores[key]);
                });
                // Preserve only the values
                stemScores = tmp;

                var mainSvg = d3.select(elem.find('svg')[0]);

                // Search for the width
                var parent = elem.parent();
                while (parent.width() < 130) {
                    parent = parent.parent();
                }
                var width = parent.width();

                mainSvg.attr('width', width);
                mainSvg.attr('height', width);

                // Also include the element width into this equation
                var margin = {top: 70, right: 20, bottom: 30, left: 40},
                    w = width - margin.left - margin.right,
                    h = width - margin.top - margin.bottom;

                function averageRGBs(rgb1, rgb2) {
                    function dec2hex(v) {
                        return v.toString(16);
                    }

                    function hex2dec(v) {
                        return parseInt(v, 16);
                    }

                    var regexSegment = /[\da-f]{2}/gi;
                    var b1 = rgb1.match(regexSegment),
                        b2 = rgb2.match(regexSegment);
                    var c = [];

                    for (var i = 0; i < b1.length; i++) {
                        var tmp = hex2dec(b1[i]) +
                            hex2dec(b2[i]);
                        var t = dec2hex(Math.floor(tmp / 2));
                        c[i] = ((t.length === 2) ?
                                '' :
                                '0') + t;
                    }
                    return '#' + c.join('');
                }

                var outerColorsRange = [
                    '#669056', '#30901B',
                    '#E4503C', '#C12B0C',
                    '#AF835B', '#AF7E12',
                    '#C4D5D4', '#717C7B',
                    '#6D9FDA', '#4967DA'
                ];
                var outerColor = d3.scale.ordinal()
                    .range(outerColorsRange);

                var innerColorsRange = [];
                for (var i = 0; i < outerColorsRange.length; i += 2) {
                    innerColorsRange[i / 2] = averageRGBs(outerColorsRange[i], outerColorsRange[i + 1]);
                }
                var innerColor = d3.scale.ordinal()
                    .range(innerColorsRange);

                var innerData = {};
                _.each(stemScores, function (d) {
                    var total = d.total;
                    var phase = d.hs.substring(2, 3);
                    if (!_.isUndefined(innerData[phase])) {
                        total += innerData[phase].total || 0;
                    }
                    var inData = innerData[phase] || {};
                    inData.phase = phase;
                    inData.total = total;
                    innerData[phase] = inData;
                });

                innerData = _.values(innerData);

                function makeOuterPieArcs(svg, pie, arc) {
                    var arcGroup = svg.selectAll('.outer.arc')
                        .data(pie(stemScores))
                        .enter().append('g')
                        .attr('class', 'arc outer')
                        .attr('transform', 'rotate(-36)');

                    arcGroup.append('path')
                        .attr('d', arc)
                        .style('fill', function (d) {
                            return outerColor(d.data.phase);
                        });
                    return arcGroup;
                }

                function appendOuterText(arcGroup, arc, offset,
                                         textFunction) {
                    var labelRadius = Math.min(w, h) / 2.5;
                    var squareWidth = Math.min(w, h) / 8;
                    var squareHeight = Math.min(w, h) / 30;
                    var heightOffset = -3;

                    function transformFunction(d) {
                        var centroid = arc.centroid(d);
                        var x = centroid[0];
                        var y = centroid[1];
                        var h = Math.sqrt(x * x + y * y);

                        var delta = labelRadius;
                        var newX = x / h * delta;
                        var newY = y / h * delta + offset;
                        // place the text somewhat on the outside
                        return 'translate(' + newX + ',' + newY + '),rotate(36)';
                    }

                    arcGroup
                        .append('rect')
                        .attr('transform', transformFunction)
                        .attr('x', squareWidth / (-2))
                        .attr('y', squareHeight / (-2) + heightOffset)
                        .attr('width', squareWidth)
                        .attr('height', squareHeight)
                        .style('opacity', 0.4)
                        .style('fill', function (d) {
                            return outerColor(d.data.phase);
                        })
                        .attr('class', 'text-background');

                    arcGroup
                        .append('text')
                        .attr('transform', transformFunction)
                        .style('text-anchor', 'middle')
                        .text(textFunction);
                }

                function makeInnerPieArcs(svg, innerPie, innerArc) {
                    var innerArcGroup = svg.selectAll('.inner.arc')
                        .data(innerPie(innerData))
                        .enter().append('g')
                        .attr('class', 'arc inner')
                        .attr('transform', 'rotate(-36)');

                    innerArcGroup.append('path')
                        .attr('d', innerArc)
                        .style('fill', function (d) {
                            return innerColor(d.data.phase);
                        });
                    return innerArcGroup;
                }

                function appendInnerText(innerArcGroup, innerArc, textFunction) {
                    innerArcGroup.append('text')
                        .attr('transform', function (d) {
                            return 'translate(' + innerArc.centroid(d) + '),rotate(36)';
                        })
                        .style('text-anchor', 'middle')
                        .text(textFunction);
                }

                function draw() {
                    // main unit
                    var radius = Math.min(w, h) / 6;
                    var innerRadius = radius / 2;
                    var outerRadiusMultiplier = 1.03;

                    var innerArc = d3.svg.arc()
                        .outerRadius(radius)
                        .innerRadius(innerRadius);
                    var outerArc = d3.svg.arc()
                        .outerRadius(function (d) {
                            return radius * outerRadiusMultiplier + d.data.total / 1.5;
                        })
                        .innerRadius(radius * outerRadiusMultiplier);

                    var innerPie = d3.layout.pie()
                        .sort(null)
                        .value(function () {
                            return 1;
                        });

                    var outerPie = d3.layout.pie()
                        .sort(null)
                        .value(function () {
                            return 1;
                        });

                    var mainGroup = mainSvg
                        .attr('width', w + margin.left + margin.right)
                        .attr('height', h + margin.top + margin.bottom)
                        .append('g')
                        .attr('transform', 'translate(' + (w / 2) +
                            ',' + (h / 2) + ')');

                    var total = 0;
                    for (var i = 0; i < stemScores.length; i++) {
                        total += stemScores[i].total;
                    }

                    // Inner area
                    var innerArcGroup = makeInnerPieArcs(mainGroup, innerPie, innerArc);
                    // Outer area
                    var arcGroup = makeOuterPieArcs(mainGroup, outerPie, outerArc);

                    appendInnerText(innerArcGroup, innerArc,
                        function (d) {
                            var percent = d.data.total / total * 100;
                            return parseFloat(percent).toFixed(2) + '%';
                        });

                    // Append name
                    appendOuterText(arcGroup, outerArc, 0,
                        function (d) {
                            return d.data.phase;
                        });
                    // Append percent
                    appendOuterText(arcGroup, outerArc, radius / 4,
                        function (d) {
                            var percent = d.data.total / total * 100;
                            return '(' + parseFloat(percent).toFixed(2) + '%)';
                        });

                    var chartCore = mainGroup
                        .append('g');
                    chartCore
                        .append('circle')
                        .attr('r', radius / 3)
                        .attr('class', 'day-master')
                        .style('fill', dmColor);
                    chartCore
                        .append('text')
                        .style('text-anchor', 'middle')
                        .text(dm);
                }

                draw();
            }
        };
    });

