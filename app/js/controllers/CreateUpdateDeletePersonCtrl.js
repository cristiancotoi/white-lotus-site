'use strict';

// The CreateUpdateDeletePersonCtrl holds the presentation logic for the Add and Edit and Delete Person screen
app.controller('CreateUpdateDeletePersonCtrl',
    function ($scope, $rootScope, $routeParams, $location, personsService/*, notifySrvc, authSrvc*/) {
        $scope.isAdd = $location.$$path.indexOf('add') != -1;
        $scope.isDelete = $location.$$path.indexOf('delete') != -1;
        
        function addPerson() {
            $rootScope.pageTitle = "Add Person"
            $scope.subTitle = $rootScope.pageTitle;
            $scope.personData = {};

            $scope.add = function (personData) {
                personData.ACL = {};
                personData.ACL[authSrvc.getCurrentUser().objectId] = {write: true, read: true};
                personsService.add(personData)
                    .$promise
                    .then(function (data) {
                        notifySrvc.showInfo("Add Person successful!");
                        $location.path("/persons");
                    }, function (err) {
                        notifySrvc.showError("Add Person failed", err);
                    });
            };
        }

        function editPerson() {
            $rootScope.pageTitle = "Edit Person"
            $scope.subTitle = $rootScope.pageTitle;
            personsService.get($routeParams.objectId)
                .$promise
                .then(function (data) {
                    $scope.personData = data;
                }, function (err) {
                    //notifySrvc.showError("Get Person failed", err);
                    $location.path("/persons");
                });
            $scope.edit = function (personData) {
                personsService.edit($routeParams.objectId, personData)
                    .$promise
                    .then(function (data) {
                        //notifySrvc.showInfo("Edit Person successful!");
                        $location.path("/persons");
                    }, function (err) {
                        notifySrvc.showError("Edit Person failed", err);
                    });
            };
        }

        function deletePerson() {
            $rootScope.pageTitle = "Delete Person"
            $scope.subTitle = "Confirm " + $rootScope.pageTitle + "?";
            personsService.get($routeParams.objectId)
                .$promise
                .then(function (data) {
                    $scope.personData = data;
                }, function (err) {
                    notifySrvc.showError("Get Person failed", err);
                    $location.path("/persons");
                });
            $scope.delete = function () {
                personsService.delete($routeParams.objectId)
                    .$promise
                    .then(function (data) {
                        notifySrvc.showInfo("Delete Person successful!");
                        $location.path("/persons");
                    }, function (err) {
                        notifySrvc.showError("Delete Person failed", err);
                    });
            };
        }

        if ($scope.isAdd) {
            addPerson();
        } else if (!$scope.isDelete) {
            editPerson();
        } else {
            deletePerson();
        }
    }
);