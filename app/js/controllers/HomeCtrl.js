'use strict';

// The HomeCtrl holds the presentation logic for the home screen
app.controller('HomeCtrl',
  function ($scope, $rootScope, $location, authSrvc) {
  	$rootScope.pageTitle = (authSrvc.isAnonymous()) ? "Wellcome" : "Home";
  	if(!authSrvc.isAnonymous()) {
  		var user = authSrvc.getCurrentUser();
  		$scope.fullName = user.fullName;
  		$scope.username = user.username;
  	}
  }
);