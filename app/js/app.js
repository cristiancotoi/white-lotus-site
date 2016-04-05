"use strict";

var app = angular.module('WhiteLotusApp', []);

app.controller('WhiteLotusCtrl', [
    '$scope',
    'persons',
    function ($scope, persons) {
        var vm = this; // this is a best practice approach
        $scope.test = 'Hello world!';
        vm.persons = persons.persons;
        vm.personsOrder = ['name', 'surname', 'year'];

        vm.newPerson = {
            name: '',
            surname1: '',
            surname2: '',
            gender: '',
            date: {
                day: '',
                month: '',
                year: '',
                hours: '',
                minutes: ''
            },
            tz: '',
            longitude: ''
        };

        vm.addPerson = function () {
            if (!vm.newPerson.name || vm.newPerson.name === '' || !vm.newPerson.date.year || vm.newPerson.date.year === ''
            ) {
                return;
            }
            vm.persons.push(angular.copy(vm.newPerson));
            vm.resetPerson();
        };

        vm.resetPerson = function () {
            vm.newPerson = {
                name: '',
                surname1: '',
                surname2: '',
                gender: '',
                date: {
                    day: '',
                    month: '',
                    year: '',
                    hours: '',
                    minutes: ''
                },
                tz: '',
                longitude: ''
            };
        };


        vm.kb = null;
        vm.date = {
            day: "12",
            month: "34",
            year: "56"
        };

        vm.numbers = {
            '0': {
                'id': '0',
                'description': 'Vid',
                count: 0
            },
            '1': {
                'id': '1',
                'description': 'Unu.',
                count: 0
            },
            '2': {
                'id': '2',
                'description': 'Doi.',
                count: 0
            },
            '3': {
                'id': '3',
                'description': 'Trei.',
                count: 0
            },
            '4': {
                'id': '4',
                'description': 'Patru.',
                count: 0
            },
            '5': {
                'id': '5',
                'description': 'Cinci.',
                count: 0
            },
            '6': {
                'id': '6',
                'description': 'Sase.',
                count: 0
            },
            '7': {
                'id': '7',
                'description': 'Sapte.',
                count: 0
            },
            '8': {
                'id': '8',
                'description': 'Opt.',
                count: 0
            },
            '9': {
                'id': '9',
                'description': 'Noua.',
                count: 0
            }
        };
        var len = Object.keys(vm.numbers).length;

        vm.digitsSquare = [];
        $scope.$watchCollection('vm.date', computeSquareNumbers, true);

        vm.op = [0, 0, 0, 0];
        vm.getDaySum = function () {
            return vm.sumDigits(vm.date.day);
        };
        vm.getMonthSum = function () {
            return vm.sumDigits(vm.date.month);
        };
        vm.getYearSum = function () {
            return vm.sumDigits(vm.date.year);
        };

        var multiplyNumber = function (number, count) {
            if (count == 0) return '.';
            var output = '';
            for (var i = 0; i < count; i += 1) {
                output += number;
            }
            return output;
        };

        vm.logNumbers = function () {
            for (var i = 1; i <= 3; i += 1) {
                var line = "";
                for (var j = 0; j < 3; j += 1) {
                    line += vm.getLongText(vm.numbers[i + j * 3]) + '\t';
                }
                console.info(i, line.trim());
            }
            console.info(0, vm.getLongText(vm.numbers[0]), '\n');
        };

        vm.getLongText = function (digit) {
            if (typeof digit == 'object') {
                return multiplyNumber(digit.id, digit.count);
            } else {
                var o = vm.numbers[digit];
                return multiplyNumber(o.id, o.count);
            }
        };

        vm.clearNumbers = function () {
            //console.info('  Clearing number counts');
            for (var i = 0; i < len; i += 1) {
                vm.numbers[i].count = 0;
            }
        };

        vm.sumDigits = function (number) {
            var sNumber = "" + number;
            var output = 0;
            for (var i = 0, sLen = sNumber.length; i < sLen; i += 1) {
                output += parseInt(sNumber.charAt(i));
            }
            return output;
        };

        function computeSquareNumbers() {
            //console.info('Computing');
            var i, c;
            var sNumber = "" + vm.date.day + vm.date.month + vm.date.year;
            var sLen;
            var firstN = sNumber.charAt(0);
            vm.clearNumbers();

            // Calculate op1 and store digits in birth date
            vm.op[0] = 0;
            //console.info('  Storing birth date digits');
            for (i = 0, sLen = sNumber.length; i < sLen; i += 1) {
                c = parseInt(sNumber.charAt(i));
                vm.op[0] += c;
                vm.numbers[c].count++;
            }

            // Calculate op2-4
            vm.op[1] = vm.sumDigits(vm.op[0]);
            vm.op[2] = vm.op[0] - firstN * 2;
            vm.op[3] = vm.sumDigits(vm.op[2]);

            sNumber = "" + vm.op[0] + vm.op[1] + vm.op[2] + vm.op[3];

            // Store digits in OPs
            for (i = 0, sLen = sNumber.length; i < sLen; i += 1) {
                c = sNumber.charAt(i);
                vm.numbers[c].count++;
            }

            vm.digitsSquare = [];
            for (i = 0; i < len; i += 1) {
                vm.digitsSquare.push(vm.getLongText(i));
            }
        }

        /*function getKB(name) {
         $http.get('kb/' + name + '.json').success(function (data) {
         vm.kb = data;
         console.info(vm.kb);
         });
         }*/

        //getKB('trepte-ale-spiritului');
    }
]);

app.factory('persons', [
    function () {
        var output = {
            persons: [
                {name: 'Stoian', surname1: 'Alex'},
                {name: 'Georgescu', surname1: 'Marian', surname2: 'G'},
                {name: 'Alexei', surname1: 'Mihai'}
            ]
        };
        return output;
    }
]);