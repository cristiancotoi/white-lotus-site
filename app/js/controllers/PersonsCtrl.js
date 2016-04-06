'use strict';

// The AddCtrl holds the presentation logic for the Add screen
app.controller('PersonsCtrl',
    function ($scope, $rootScope, $location, phoneSrvc, notifySrvc, authSrvc) {
        $rootScope.pageTitle = "List"
        $scope.results = [];

        $scope.list = function (phoneData) {
            phoneSrvc.get()
                .$promise
                .then(function (data) {
                    console.debug(data);
                    $scope.results = (data.results) ? data.results : [];
                }, function (err) {
                    notifySrvc.showError("Get Phones failed", err);
                });
        };

        $scope.list();
    }
);