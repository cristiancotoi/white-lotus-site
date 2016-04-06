'use strict';

// The LoginCtrl holds the presentation logic for the login screen
app.controller('LoginCtrl',
  function ($scope, $rootScope, $location, authSrvc, notifySrvc) {
  	$rootScope.pageTitle = "Login"
  	$scope.userData = {};
    
  	$scope.login = function (userData) {
  		authSrvc.login(userData, function (data) {
        notifySrvc.showInfo("Login successful!");
        $location.path("/");
      }, function (err) {
        notifySrvc.showError("Login failed", err);
      });
  	}
  }
);