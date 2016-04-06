'use strict';

// The AppCtrl holds the presentation logic for the entire app (common for all screens)
app.controller('AppCtrl',
  function ($scope, $location, authSrvc, notifySrvc) {
    // Put the authSrvc in the $scope to make it accessible from all screens
    $scope.authSrvc = authSrvc;
    // Implement the "logout" button click event handler
    $scope.logout = function() {
        authSrvc.logout();
        notifySrvc.showInfo("Logout successful");
        $location.path("#/");
    };
  }
);