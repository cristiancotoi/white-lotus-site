'use strict';

// The RegisterCtrl holds the presentation logic for the Register screen
app.controller('RegisterUpdateProfileCtrl',
    function ($scope, $rootScope, $routeParams, $location, authSrvc, profileSrvc, notifySrvc) {
        $scope.isRegister = $location.$$path.indexOf('register') != -1;
        if ($scope.isRegister) {
            $rootScope.pageTitle = "Register"
            $scope.userData = {};
            $scope.register = function (userData) {
                authSrvc.register(userData)
                    .$promise
                    .then(function () {
                        notifySrvc.showInfo("Register successful!");
                        $location.path("/login");
                    }, function (err) {
                        notifySrvc.showError("User registration failed", err);
                    });
            };
        } else {
            $rootScope.pageTitle = "Edit Profile"
            profileSrvc.get(authSrvc.getCurrentUser().objectId).$promise
                .then(function (data) {
                    $scope.userData = data;
                }, function (err) {
                    notifySrvc.showError("Get profile failed", err);
                    $location.path("/");
                });

            $scope.update = function (userData) {
                profileSrvc.update(authSrvc.getCurrentUser().objectId, userData)
                    .$promise
                    .then(function () {
                        notifySrvc.showInfo("Update profile successful!");
                        authSrvc.logout();
                        $location.path('/login');
                    }, function (err) {
                        notifySrvc.showError("Update profile failed", err);
                    });
            };
        }
    }
);